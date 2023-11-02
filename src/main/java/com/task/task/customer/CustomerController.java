package com.task.task.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "customer")
@CrossOrigin("http://localhost:3000/")
public class CustomerController {

    private final CustomerService customerService;
    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getCustomers(){
        return customerService.getCustomers();
    }
    @GetMapping(path = "{customerId}")
    public Customer getCustomer(@PathVariable("customerId") Long customerId){return customerService.getCustomer(customerId);}
    @PostMapping(path="userlogin")
    public ResponseEntity<Customer> getCustomerLogin(@RequestBody LoginCreds loginCreds){
        return this.customerService.getCustomerLogin(loginCreds.getEmail(),loginCreds.getPassword());
    }
    @PostMapping
    public void registerNewCustomer(@RequestBody Customer customer){
        customerService.addNewCustomer(customer);
    }
    @DeleteMapping(path = "{customerId}")
    public void deleteCustomer(@PathVariable("customerId")Long id){
        customerService.deleteCustomer(id);

    }
    @PutMapping(path = "{customerId}")
    public void updateCustomer(
            @RequestBody Customer customer,
            @PathVariable("customerId") Long customerId)
             {

        customerService.updateCustomer(customerId,customer.getName(),customer.getLastName(),customer.getHomePhoneN(),customer.getCellPhoneN(),customer.getEmail(),customer.getPassword());
    }
}
