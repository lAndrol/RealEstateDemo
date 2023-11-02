package com.task.task.estate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.jpa.domain.Specification;
import com.task.task.business.Business;
import com.task.task.customer.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.util.Predicates;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table
public class Estate {
    public enum Heating{
        Klima,Doğalgaz,Merkezi,Yok

    }
    public enum EstateType{
        Satılık,Kiralık
    }

    @SequenceGenerator(
            name = "estate_sequence",
            sequenceName = "estate_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "estate_sequence"
    )
    @Id
    @Column(name = "emlak_id")
    private Long estateId;
    @Column(name="emlak_turu")
    @Enumerated(EnumType.STRING)
    private EstateType estateType;
    @Column(name="metrekare")
    private Integer squareMeter;
    @Column(name = "fiyat")
    private Float price;
    @Column(name="oda_sayisi")
    private Integer numberOfRooms;
    @Column(name="bulundugu_kat")
    private Integer floor;
    @Column(name="kat_sayisi")
    private Integer numberOfFloors;
    @Column(name="isinma")
    @Enumerated(EnumType.STRING)
    private Heating heating;
    @ManyToOne
    @JoinColumn(name = "musteri_id")
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "isletme_id")
    private Business business;

    public Estate() {
    }

    public Estate(EstateType estateType, Integer squareMeter, Float price, Integer numberOfRooms, Integer floor, Integer numberOfFloors, Heating heating) {
        this.estateType = estateType;
        this.squareMeter = squareMeter;
        this.price = price;
        this.numberOfRooms = numberOfRooms;
        this.floor = floor;
        this.numberOfFloors = numberOfFloors;
        this.heating = heating;
    }

    public Estate(EstateType estateType, Integer squareMeter, Float price, Integer numberOfRooms, Integer floor, Integer numberOfFloors, Heating heating, Customer customer, Business business) {
        this.estateType = estateType;
        this.squareMeter = squareMeter;
        this.price = price;
        this.numberOfRooms = numberOfRooms;
        this.floor = floor;
        this.numberOfFloors = numberOfFloors;
        this.heating = heating;
        this.customer = customer;
        this.business = business;
    }

    public Estate(Long estateId, EstateType estateType, Integer squareMeter, Float price, Integer numberOfRooms, Integer floor, Integer numberOfFloors, Heating heating, Customer customer, Business business) {
        this.estateId = estateId;
        this.estateType = estateType;
        this.squareMeter = squareMeter;
        this.price = price;
        this.numberOfRooms = numberOfRooms;
        this.floor = floor;
        this.numberOfFloors = numberOfFloors;
        this.heating = heating;
        this.customer = customer;
        this.business = business;
    }

    @Override
    public String toString() {
        return "Estate{" +
                "estateId=" + estateId +
                ", estateType=" + estateType +
                ", squareMeter=" + squareMeter +
                ", price=" + price +
                ", numberOfRooms=" + numberOfRooms +
                ", floor=" + floor +
                ", numberOfFloors=" + numberOfFloors +
                ", heating=" + heating +
                ", customer=" + customer +
                ", business=" + business +
                '}';
    }


}
