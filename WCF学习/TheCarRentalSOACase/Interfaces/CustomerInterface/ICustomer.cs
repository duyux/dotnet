using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;

namespace CustomerInterface
{
    [ServiceContract]
   public interface ICustomer
   {
        [OperationContract]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        int RegisterCustomer(Customer customer);

   }

    [DataContract]
    public class Customer
    {
        [DataMember]
        public string CustomerName { get; set; }

        [DataMember]
        public string CustomerFirstName { get; set; }

        [DataMember]
        public string CustomerMiddleLetter { get; set; }
       
        [DataMember]
        public DateTime CustomerBirthDate { get; set; }
    }
}
