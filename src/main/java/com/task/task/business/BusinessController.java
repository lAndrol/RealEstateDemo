package com.task.task.business;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.task.task.customer.Customer;
import com.task.task.customer.LoginCreds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "business")
@CrossOrigin("http://localhost:3000/")
public class BusinessController {
    private final BusinessService businessService;
    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public List<Business> getBusinesss(){
        return businessService.getBusiness();
    }
    @GetMapping(path = "{businessId}")
    public Business getBusinesss(@PathVariable("businessId")Long id){
        return businessService.getBusiness(id);
    }
    @PostMapping
    public void registerNewBusiness(@RequestBody Business business){
        businessService.addNewBusiness(business);
    }
    @PostMapping(path="login")
    public ResponseEntity<Business> getCustomerLogin(@RequestBody LoginCreds loginCreds){
        return this.businessService.getBusinessLogin(loginCreds.getEmail(),loginCreds.getPassword());
    }
    @DeleteMapping(path = "{businessId}")
    public void deleteBusiness(@PathVariable("businessId")Long id){
        businessService.deleteBusiness(id);

    }
    @PutMapping(path = "{businessId}")
    public void updateBusiness(
            @PathVariable("businessId") Long businessId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phoneN,
            @RequestParam(required = false) String fax,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password) {

        businessService.updateBusiness(businessId,name,phoneN,fax,email,password);
    }
    

}
