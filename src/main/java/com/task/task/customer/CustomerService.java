package com.task.task.customer;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CustomerService {

private final CustomerRepository customerRepository;
@Autowired
public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
}

public List<Customer> getCustomers(){
    return customerRepository.findAll();
}
public Customer getCustomer(Long id) {
    Customer customer = getCustomers().stream().filter(t-> id.equals(t.getCustomerId()))
            .findFirst()
            .orElse(null);
    return customer;
}
public ResponseEntity<Customer> getCustomerLogin(String email, String password){
    Optional<Customer> customerOptional = customerRepository.findCustomerLogin(email,password);
    if(!customerOptional.isPresent()){
       throw new IllegalStateException("Wrong password or E-mail");
    }
    return ResponseEntity.ok(customerOptional.get());
}

public void addNewCustomer(Customer customer) {
    Optional<Customer> customerByEmail = customerRepository.findCustomerByEmail(customer.getEmail());
    if(customerByEmail.isPresent()){
        throw new IllegalStateException("email taken");
    }
    customerRepository.save(customer);
}

public void deleteCustomer(Long customerId){
    boolean exists = customerRepository.existsById(customerId);
    if(!exists){
        throw new IllegalStateException("Customer with id "+ customerId + " does not exists");
    }
    customerRepository.deleteById(customerId);
}

@Transactional
public void updateCustomer(Long customerId, String name, String lastName, String homePhoneN, String cellPhoneN, String email,String password) {
    Customer customer = customerRepository.findById(customerId).orElseThrow(()->new IllegalStateException(
            "customer with id " + customerId + " does not exist"
    ));

    if (name!=null &&
    name.length()>0&&
    !Objects.equals(customer.getName(),name)){
        customer.setName(name);
    }
    if (lastName!=null &&
            lastName.length()>0&&
            !Objects.equals(customer.getLastName(),lastName)){
        customer.setLastName(lastName);
    }
    if (homePhoneN!=null &&
            homePhoneN.length()>0&&
            !Objects.equals(customer.getHomePhoneN(),homePhoneN)){
        customer.setHomePhoneN(homePhoneN);
    }
    if (cellPhoneN!=null &&
            cellPhoneN.length()>0&&
            !Objects.equals(customer.getCellPhoneN(),cellPhoneN)){
        customer.setName(cellPhoneN);
    }
    if (email!=null &&
            email.length()>0&&
            !Objects.equals(customer.getEmail(),email)){
        Optional<Customer> customerOptional = customerRepository.findCustomerByEmail(email);
        if(customerOptional.isPresent()){
            throw new IllegalStateException("email taken");
        }
        customer.setEmail(email);
    }
    if(password!=null&&
    password.length()>0&&
    !Objects.equals(customer.getPassword(),password)){
        customer.setPassword(password);
    }

}
}
