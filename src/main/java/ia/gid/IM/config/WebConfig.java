package ia.gid.IM.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")               // autorise toutes les routes
                        .allowedOrigins("http://localhost:5173") // autorise le frontend Vite
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // méthodes HTTP autorisées
                        .allowCredentials(true);           // autoriser les cookies/authentifications si besoin
            }
        };
    }
}
