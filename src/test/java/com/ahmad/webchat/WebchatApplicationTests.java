package com.ahmad.webchat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class WebchatApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
    void exampleTest() {
        int sum = 1 + 1;
        assertThat(sum).isEqualTo(2);
    }
}
