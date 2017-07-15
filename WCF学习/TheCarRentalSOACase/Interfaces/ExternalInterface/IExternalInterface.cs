using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using RentalInterface;
using CustomerInterface;

namespace ExternalInterface
{
    [ServiceContract]
   public interface IExternalInterface
    {
        [OperationContract]
        void SubmitRentalContract(RentalContract rentalContract);
    }

    [DataContract]
   public class RentalContract
   {
       [DataMember]
        public string Company { get; set; }

       [DataMember]
        public string CompanyReferenceID { get; set; }

       [DataMember]
        public RentalRegistration RentalRegistration { get; set; }

       [DataMember]
        public Customer Customer { get; set; }
   }
}
