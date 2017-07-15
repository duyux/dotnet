using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using CustomerInterface;

namespace CustomerService
{
    public class CustomerServiceImplementation:ICustomer
    {
       
        [OperationBehavior(TransactionAutoComplete=true,
                           TransactionScopeRequired=true)]
        public int RegisterCustomer(CustomerInterface.Customer customer)
        {
            using (DataClassesCustomerDataContext ctx = new DataClassesCustomerDataContext())
            {
                Customer customerToInsert;
                customerToInsert = new Customer();
                customerToInsert.CustomerName = customer.CustomerName;
                customerToInsert.CustomerFirstName = customer.CustomerFirstName;
                ctx.Customer.InsertOnSubmit(customerToInsert);
                ctx.SubmitChanges();
                return customerToInsert.CustomerID;
            }
        }
    }
}
