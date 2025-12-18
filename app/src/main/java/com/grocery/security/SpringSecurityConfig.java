package com.grocery.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.config.web.PathPatternRequestMatcherBuilderFactoryBean;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

@PropertySource("file:/C:/Users/yoavk/.secrets/google-openid-credentials.properties")
@EnableWebSecurity(debug=true)
@ComponentScan
@EnableMethodSecurity
@Configuration
public class SpringSecurityConfig {

    @Value("${googleClientId}")
    private String googleClientId;

    @Value("${googleClientSecret}")
    private String googleClientSecret;

    @Autowired
    AutoRegistrationSuccessHandler autoRegisterSuccessHandler;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthorizationManager<RequestAuthorizationContext> tenantAuthManager) throws Exception {
        return http.oauth2Login(oauth2 -> oauth2.successHandler(autoRegisterSuccessHandler))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/tenant/**").access(tenantAuthManager)
                .anyRequest().authenticated()
            )
            .build();
    }

    // refer to https://docs.spring.io/spring-security/reference/servlet/integrations/mvc.html#mvc-requestmatcher
    // basically, without this, we'd have to configure Spring Security and Spring MVC in the same ApplicationContext
    // something with PathPatternRequestMatcher
    @Bean
    PathPatternRequestMatcherBuilderFactoryBean usePathPattern() {
    	return new PathPatternRequestMatcherBuilderFactoryBean();
    }

    private ClientRegistration googleClientRegistration() {
		return CommonOAuth2Provider.GOOGLE.getBuilder("google")
			.clientId(googleClientId)
			.clientSecret(googleClientSecret)
			.build();
	}

    @Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
	}

    // we create this bean so it'll be available in the Controller class
    // so we can access the AccessToken
    @Bean
	public OAuth2AuthorizedClientService authorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
		return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
	}
}