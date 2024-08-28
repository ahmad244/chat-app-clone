package com.ahmad.webchat.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ahmad.webchat.exception.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain)
            throws ServletException, IOException {
        try {
            String path = request.getRequestURI();
            // Skip the filter for authentication endpoints
            if (path.startsWith("/api/auth/")) {
                System.out.println("Path: " + path);

                chain.doFilter(request, response);
                return;
            }

            Cookie jwtCookie = null;
            Cookie[] cookies = request.getCookies();
            if (cookies == null) {
                throw new SignatureException("No JWT cookie found");
            }

            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    jwtCookie = cookie;
                    break;
                }
            }

            if (jwtCookie == null) {
                chain.doFilter(request, response);
                return;
            }

            String jwt = jwtCookie.getValue();
            String username = jwtUtil.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails)) {

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
            chain.doFilter(request, response);
        } catch (SignatureException e) {
            // Handle JWT signature exception
            handleException(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT signature", e);
        } catch (ExpiredJwtException e) {
            // Handle expired JWT exception
            handleException(response, HttpServletResponse.SC_UNAUTHORIZED, "JWT token is expired", e);
        } catch (AuthenticationException e) {
            // Handle other authentication exceptions
            handleException(response, HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed", e);
        } catch (Exception e) {
            // Handle any other exceptions
            handleException(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error", e);
        }
    }

    private void handleException(HttpServletResponse response, int statusCode, String message, Exception e)
            throws IOException {
        ErrorResponse errorResponse = new ErrorResponse(message, statusCode, System.currentTimeMillis());
        response.setStatus(statusCode);
        response.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);

        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
        response.getWriter().close();

        // Log the error
        System.out.println(message + ": " + e.getMessage());
    }
}
