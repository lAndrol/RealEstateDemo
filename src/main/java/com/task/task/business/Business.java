package com.task.task.business;

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

public class Business {
    @SequenceGenerator(
            name = "business_sequence",
            sequenceName = "business_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "business_sequence"
    )
    @Id
    @Column(name = "business_id")
    private Long businessId;
    @Column(name = "name")
    private String name;
    @Column(name = "telefon")
    private String phoneN;
    private String fax;
    private String email;
    @Column(name = "sifre")
    private String password;
    @OneToMany(mappedBy = "business")
    private List<Estate> estates;

    public Business(Long businessId, String name, String phoneN, String fax, String email, String password) {
        this.businessId = businessId;
        this.name = name;
        this.phoneN = phoneN;
        this.fax = fax;
        this.email = email;
        this.password = password;
    }

    public Business(String name, String phoneN, String fax, String email, String password) {
        this.name = name;
        this.phoneN = phoneN;
        this.fax = fax;
        this.email = email;
        this.password = password;
    }

    public Business() {
    }

    @Override
    public String toString() {
        return "Business{" +
                "businessId=" + businessId +
                ", name='" + name + '\'' +
                ", phoneN='" + phoneN + '\'' +
                ", fax='" + fax + '\'' +
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
