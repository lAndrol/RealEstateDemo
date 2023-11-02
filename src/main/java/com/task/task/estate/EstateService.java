package com.task.task.estate;

import com.task.task.business.Business;
import com.task.task.business.BusinessRepository;
import com.task.task.customer.Customer;
import com.task.task.customer.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EstateService {
    private final CustomerRepository customerRepository;
    private final EstateRepository estateRepository;
    private final BusinessRepository businessRepository;

    @Autowired
    public EstateService(EstateRepository estateRepository, CustomerRepository customerRepository, BusinessRepository businessRepository){this.estateRepository=estateRepository;this.customerRepository=customerRepository;this.businessRepository=businessRepository;}

    public List<Estate> getEstates(){return estateRepository.findAll();}
    public void addNewCustomerEstate(Estate estate,Long id){
        Optional<Customer> customer = customerRepository.findById(id);
        if(customer.isPresent()){
            estate.setCustomer(customer.get());
            estateRepository.save(estate);
        }

    }
    public void addNewBusinessEstate(Estate estate,Long id){
        Optional<Business> business=businessRepository.findById(id);
        if(business.isPresent()){
            estate.setBusiness(business.get());
            estateRepository.save(estate);
        }
    }

    public void deleteEstate(Long estateId){
        boolean exists = estateRepository.existsById(estateId);
        if(!exists){
            throw new IllegalStateException("Estate with id "+ estateId + " does not exist");
        }
        estateRepository.deleteById(estateId);
    }
    @Transactional
    public void updateEstate(Long estateId, Estate.EstateType estateType, Integer squareMeter, Float price, Integer numberOfRooms,Integer floor, Integer numberOfFloors, Estate.Heating heating, Customer customer, Business business){
        Estate estate = estateRepository.findById(estateId).orElseThrow(()->new IllegalStateException(
                "estate with id " + estateId + " does not exist"
        ));
        if(estateType!=null&&!Objects.equals(estate.getEstateType(),estateType)){
            estate.setEstateType(estateType);
        }
        if(squareMeter!=null&&squareMeter>0&&!Objects.equals(estate.getSquareMeter(),squareMeter)){
            estate.setSquareMeter(squareMeter);
        }
        if(price!=null&&price>0&&!Objects.equals(estate.getPrice(),price)){
            estate.setPrice(price);
        }
        if(numberOfRooms!=null&&numberOfRooms>0&&!Objects.equals(estate.getNumberOfRooms(),numberOfRooms)){
            estate.setNumberOfRooms(numberOfRooms);
        }
        if(floor!=null&&floor>0&&!Objects.equals(estate.getFloor(),floor)){
            estate.setFloor(floor);
        }
        if(numberOfFloors!=null&&numberOfFloors>0&&!Objects.equals(estate.getNumberOfFloors(),numberOfFloors)){
            estate.setNumberOfFloors(numberOfFloors);
        }
        if(heating!=null&&!Objects.equals(estate.getHeating(),heating)){
            estate.setHeating(heating);
        }
        if(customer!=null&&!Objects.equals(estate.getCustomer(),customer)){
            estate.setCustomer(customer);
        }
        if(business!=null&&!Objects.equals(estate.getBusiness(),business)){
            estate.setBusiness(business);
        }
    }

    public void addNewEstate(Estate estate) {
        estateRepository.save(estate);
    }

    public Estate getEstate(Long id) {
        if(estateRepository.findById(id).isPresent()){
            return estateRepository.findById(id).get();
        }else{
            throw new IllegalStateException("no estate with the given id");
        }


    }

    public List<Estate> searchEstates(Estate.EstateType estateType, Integer squareMeter, Float price, Integer numberOfRooms, Integer floor, Integer numberOfFloors, Estate.Heating heating) {
        System.out.println("Service run");
        return estateRepository.findByCriteria(estateType,squareMeter,price,numberOfRooms,floor,numberOfFloors,heating);
    }

    public List<Estate> findOwned(Customer customer) {
        return estateRepository.findByCustomer(customer);
    }
    public List<Estate> findOwned(Business business) {
        return estateRepository.findByBusiness(business);
    }
}
