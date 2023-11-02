package com.task.task.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository
        extends JpaRepository<Customer,Long> {
    @Query("SELECT c FROM Customer c WHERE c.email =?1")
    Optional<Customer> findCustomerByEmail(String email);
    @Query("SELECT c FROM Customer c WHERE c.password=?1")
    Optional<Customer> findCustomerByPassword(String password);
    @Query("SELECT c FROM Customer c WHERE c.email=?1 AND c.password=?2")
    Optional<Customer> findCustomerLogin(String email,String password);

}
