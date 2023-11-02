package com.task.task.customer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CustomerConfig {
    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository repository){
        return args -> {
            Customer genco = new Customer(
                    "Genco",
                    "Seçilen",
                    "03222321703",
                    "05379940957",
                    "ermangenco@hotmail.com",
                    "password1223"
            );
            Customer test = new Customer(
                    "test",
                    "testing",
                    "2323",
                    "2323",
                    "testtest@got.com",
                    "password1223");

            repository.saveAll(List.of(genco,test));
        };


    }
}
