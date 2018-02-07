pragma solidity ^0.4.6;

contract IFB_AM
{
    struct Account{
        string fullIdentity;
        string username;
        string password;
        string role;
    }
    
    mapping(uint => Account) Total;
    uint8 Count=0;

    function addNewAccount(string fullIdentity, string username, string password, string role)
    {
        Account memory newAccount;
        newAccount.fullIdentity = fullIdentity;
        newAccount.username= username;
        newAccount.password= password;
        newAccount.role = role;
      
        Total[Count] = newAccount;
        Count++;
    }
    function GetCount() returns(uint8){
        return Count;
    }

    function getAccount(uint8 CountNo) returns (string,string,string,string)
    {
        return (Total[CountNo].fullIdentity, Total[CountNo].username, Total[CountNo].password,Total[CountNo].role);
    }
}