package com.task.task.estate;


import com.task.task.business.Business;
import com.task.task.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstateRepository
        extends JpaRepository<Estate,Long> {

    @Query("SELECT e FROM Estate e WHERE " +
            "(?1 IS NULL OR e.estateType = ?1) " +
            "AND (?2 IS NULL OR e.squareMeter = ?2) " +
            "AND (?4 IS NULL OR e.numberOfRooms = ?4) " +
            "AND (?5 IS NULL OR e.floor = ?5) " +
            "AND (?6 IS NULL OR e.numberOfFloors = ?6) " +
            "AND (?7 IS NULL OR e.heating = ?7)"+
            "AND (?3 IS NULL OR e.price = ?3)")
    public List<Estate> findByCriteria(
            Estate.EstateType estateType,
            Integer squareMeter,
            Float price,
            Integer numberOfRooms,
            Integer floor,
            Integer numberOfFloors,
            Estate.Heating heating);
    @Query("SELECT e FROM Estate e WHERE e.customer=?1")
    List<Estate> findByCustomer(Customer customer);
    @Query("SELECT e FROM Estate e WHERE e.business=?1")
    List<Estate> findByBusiness(Business business);
}

