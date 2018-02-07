pragma solidity ^0.4.6;

contract EmployeeChain

{
 
    struct Account{
        string fullName;
        uint experience;
        string specialization;
        uint phone;
        string recordCreatorName;
        uint createDate;
        uint updateDate;
    }
    
    mapping(uint => Account) Total;
    uint8 Count=0;

    function addNewAccount(uint pass, string fullName,uint experience,string specialization,uint phone,string recordCreatorName) 
    {
        if(pass == 4321){
        Account memory newAccount;
        newAccount.fullName = fullName;
        newAccount.experience= experience;
        newAccount.specialization= specialization;
        newAccount.phone= phone;
        newAccount.recordCreatorName= recordCreatorName;
        newAccount.createDate = now;
        newAccount.updateDate = now;
        Total[Count] = newAccount;
        Count++;
        
        }
    }
    
    function updateAccount(uint8 CountNo,uint pass, uint experience,string specialization,uint phone,string recordCreatorName)  
    {
        if(pass == 54321){
        Total[CountNo].experience= experience;
        Total[CountNo].specialization= specialization;
        Total[CountNo].phone= phone;
        Total[CountNo].recordCreatorName= recordCreatorName;
        Total[CountNo].updateDate = now;
         
        }
    
    }
    
    
    function GetCount() returns(uint8){
        return Count;
    }

    function getAccount(uint8 CountNo) returns (string,uint,string,uint,string,uint,uint)
    {
        return (Total[CountNo].fullName,Total[CountNo].experience,Total[CountNo].specialization,Total[CountNo].phone,Total[CountNo].recordCreatorName,Total[CountNo].createDate,Total[CountNo].updateDate);
    }
}