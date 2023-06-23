package org.example.SecurityApp.config;

import org.example.SecurityApp.services.UsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author Neil Alishev
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UsersDetailsService usersDetailsService;
    private final SuccessUserHandler successUserHandler;

    @Autowired
    public SecurityConfig(UsersDetailsService usersDetailsService, SuccessUserHandler successUserHandler) {
        this.usersDetailsService = usersDetailsService;
        this.successUserHandler = successUserHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Configuring Spring Security
        // Configuring authorization
        http
                .csrf().disable().authorizeRequests()
                .antMatchers("/user").hasRole("USER")
                .antMatchers("/index", "/admin/**").hasRole("ADMIN")
                .antMatchers("login", "/registration", "/error").permitAll()
                .and()
                .formLogin().loginPage("/login")
                .loginProcessingUrl("/process_login")
                .successHandler(successUserHandler)
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login");
    }

    // Настраивает аутентификацию
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usersDetailsService)
                .passwordEncoder(getPasswordEncoder());
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}