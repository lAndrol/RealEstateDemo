package com.task.task.business;

import com.task.task.customer.Customer;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;
    @Autowired
    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public List<Business> getBusiness(){
        return businessRepository.findAll();
    }

    public void addNewBusiness(Business business) {
        Optional<Business> businessByEmail = businessRepository.findBusinessByEmail(business.getEmail());
        if(businessByEmail.isPresent()){
            throw new IllegalStateException("email taken");
        }
        businessRepository.save(business);
    }
    public Business getBusiness(Long id) {
        Optional<Business> business =businessRepository.findById(id);
        if(business.isPresent()) {
            return business.get();
        }else{
            throw new IllegalStateException("no business with given Id");
        }
    }
    public ResponseEntity<Business> getBusinessLogin(String email,String password){
        Optional<Business> businessOptinal = businessRepository.findBusinessLogin(email,password);
        if(!businessOptinal.isPresent()){
            throw new IllegalStateException("Wrong password or E-mail");
        }
        return ResponseEntity.ok(businessOptinal.get());
    }
    public void deleteBusiness(Long businessId){
        boolean exists = businessRepository.existsById(businessId);
        if(!exists){
            throw new IllegalStateException("Business with id "+ businessId + " does not exists");
        }
        businessRepository.deleteById(businessId);
    }

    @Transactional
    public void updateBusiness(Long businessId, String name, String phoneN, String fax,String email,String password) {
        Business business = businessRepository.findById(businessId).orElseThrow(()->new IllegalStateException(
                "business with id " + businessId + " does not exist"
        ));

        if (name!=null &&
                name.length()>0&&
                !Objects.equals(business.getName(),name)){
            business.setName(name);
        }

        if (phoneN!=null &&
                phoneN.length()>0&&
                !Objects.equals(business.getPhoneN(),phoneN)){
            business.setPhoneN(phoneN);
        }
        if (fax!=null &&
                fax.length()>0&&
                !Objects.equals(business.getFax(),fax)){
            business.setFax(fax);
        }
        if (email!=null &&
                email.length()>0&&
                !Objects.equals(business.getEmail(),email)){
            business.setEmail(email);
        }
        if (password!=null &&
                password.length()>0&&
                !Objects.equals(business.getPassword(),password)){
            business.setPassword(password);
        }

    }


}
