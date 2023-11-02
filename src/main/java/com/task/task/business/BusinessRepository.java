package com.task.task.business;

import com.task.task.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business,Long> {
    @Query("SELECT b FROM Business b WHERE b.email =?1")
    Optional<Business> findBusinessByEmail(String email);

    @Query("SELECT b FROM Business b WHERE b.email=?1 AND b.password=?2")
    Optional<Business> findBusinessLogin(String email, String password);
}
