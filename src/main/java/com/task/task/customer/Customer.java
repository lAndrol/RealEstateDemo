package com.task.task.customer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.task.task.estate.Estate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table
public class Customer {
    @SequenceGenerator(
            name = "customer_sequence",
            sequenceName = "customer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_sequence"
    )
    @Id
    @Column(name = "musteri_id")
    private Long customerId;
    @Column(name = "isim")
    private String name;
    @Column(name = "soy_isim")
    private String lastName;
    @Column(name = "ev_telefonu")
    private String homePhoneN;
    @Column(name = "cep_telefonu")
    private String cellPhoneN;
    private String email;
    @Column(name = "sifre")
    private String password;

    @OneToMany(mappedBy = "customer")
    private List<Estate> estates;

    public Customer(Long customerId, String name, String lastName, String homePhoneN, String cellPhoneN, String email,String password) {
        this.customerId = customerId;
        this.name = name;
        this.lastName = lastName;
        this.homePhoneN = homePhoneN;
        this.cellPhoneN = cellPhoneN;
        this.email = email;
        this.password=password;
    }

    public Customer(String name, String lastName, String homePhoneN, String cellPhoneN, String email,String password) {
        this.name = name;
        this.lastName = lastName;
        this.homePhoneN = homePhoneN;
        this.cellPhoneN = cellPhoneN;
        this.email = email;
        this.password=password;
    }

    public Customer() {
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", homePhoneN='" + homePhoneN + '\'' +
                ", cellPhoneN='" + cellPhoneN + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", estates=" + estates +
                '}';
    }
    @JsonIgnore
    public List<Estate> getEstates() {
        return estates;
    }

}
