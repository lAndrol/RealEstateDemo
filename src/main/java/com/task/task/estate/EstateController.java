package com.task.task.estate;

import com.task.task.business.Business;
import com.task.task.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="estate")
@CrossOrigin("http://localhost:3000/")
public class EstateController {


    private final EstateService estateService;

    @Autowired
    public EstateController(EstateService estateService){
        this.estateService=estateService;
    }
    @GetMapping
    public List<Estate> getEstates(){return estateService.getEstates();}
    @GetMapping(path = "{estateId}")
    public Estate getEstates(@PathVariable("estateId")Long id){return estateService.getEstate(id);}
    @PostMapping
    public void registerNewEstate(@RequestBody Estate estate){estateService.addNewEstate(estate);}
    @PostMapping(path="user")
    public void registerNewEstate(@RequestBody Estate estate,@RequestParam Long id){estateService.addNewCustomerEstate(estate,id);}
    @PostMapping(path = "business")
    public void registerBusinessNewEstate(@RequestBody Estate estate,@RequestParam Long id){
        estateService.addNewBusinessEstate(estate,id);
    }
    @DeleteMapping(path="{estateId}")
    public void deleteEstate(@PathVariable("estateId") Long id){
        estateService.deleteEstate(id);
    }
    @PutMapping(path="{estateId}")
    public void updateEstate(
            @PathVariable("estateId") Long estateId,
            @RequestParam(required = false) Estate.EstateType estateType,
            @RequestParam(required = false) Integer squareMeter,
            @RequestParam(required = false) Float price,
            @RequestParam(required = false) Integer numberOfRooms,
            @RequestParam(required = false) Integer floor,
            @RequestParam(required = false) Integer numberOfFloors,
            @RequestParam(required = false) Estate.Heating heating,
            @RequestParam(required = false) Customer customer,
            @RequestParam(required = false) Business business){
        estateService.updateEstate(estateId,estateType,squareMeter,price,numberOfRooms,floor,numberOfFloors,heating,customer,business);
    }
    @PostMapping(path = "owned")
    public List<Estate> findOwned(@RequestBody Customer customer){
        return estateService.findOwned(customer);
    }
    @PostMapping(path = "businessowned")
    public List<Estate> findOwned(@RequestBody Business business){
        return estateService.findOwned(business);
    }
    @GetMapping(path = "search")
    public List<Estate> findSearchEstate(
            @RequestParam(required = false) Estate.EstateType estateType,
            @RequestParam(required = false) Integer squareMeter,
            @RequestParam(required = false) Float price,
            @RequestParam(required = false) Integer numberOfRooms,
            @RequestParam(required = false) Integer floor,
            @RequestParam(required = false) Integer numberOfFloors,
            @RequestParam(required = false) Estate.Heating heating){

        return estateService.searchEstates(estateType,squareMeter,price,numberOfRooms,floor,numberOfFloors,heating);
    }


}
