package com.grocery.business;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.mysql.cj.jdbc.MysqlDataSource;



@Configuration
@ComponentScan
@PropertySource("file:/C:/Users/yoavk/.secrets/google-openid-credentials.properties")
public class SpringBusinessConfig implements WebMvcConfigurer {
    @Value("${db.user}")
    private String dbUser;

    @Value("${db.password}")
    private String dbPassword;

    public SpringBusinessConfig() {
        super();
    }

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
        
        MysqlDataSource mysqlDS = new MysqlDataSource();
        mysqlDS.setURL(dbUrl);
        mysqlDS.setUser(this.dbUser);
        mysqlDS.setPassword(this.dbPassword);

        return mysqlDS;
	}
}
