package com.grocery.business;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import com.mysql.cj.jdbc.MysqlDataSource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;


import javax.sql.DataSource;



@Configuration
@ComponentScan
public class SpringBusinessConfig implements WebMvcConfigurer {
    public SpringBusinessConfig() {
        super();
    }

    
    
    // ======== DataSource for MySQL database

    @Bean
    @Profile("dev")
	DataSource getDevDataSource() {
		return new EmbeddedDatabaseBuilder()
			.setType(EmbeddedDatabaseType.H2)
			.addScript("classpath:com/grocery/schema.sql")
            .setScriptEncoding("UTF-8")
			.build();
	}

    
    @Bean
    @Profile("default")
	DataSource getProdDataSource() {
		String dbUrl = "jdbc:mysql://localhost:3306/grocery";
        String dbUser = "yoav";
        String dbPassword = "yoav";

        MysqlDataSource mysqlDS = null;
        
        mysqlDS = new MysqlDataSource();
        mysqlDS.setURL(dbUrl);
        mysqlDS.setUser(dbUser);
        mysqlDS.setPassword(dbPassword);

        return mysqlDS;
	}
}
