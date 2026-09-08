package com.grocery.business;

import javax.sql.DataSource;
import com.mysql.cj.jdbc.MysqlDataSource;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class SpringInfraConfig {
    @Bean
    public PlatformTransactionManager txManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    
    @Bean
    public DataSource dataSource() {
        String dbUrl = "jdbc:mysql://localhost:3306";
        String dbUser = "yoav";
        String dbPassword = "yoav";

        MysqlDataSource mysqlDS = new MysqlDataSource();
        mysqlDS.setURL(dbUrl);
        mysqlDS.setUser(dbUser);
        mysqlDS.setPassword(dbPassword);

        return mysqlDS;
        
    }
}
