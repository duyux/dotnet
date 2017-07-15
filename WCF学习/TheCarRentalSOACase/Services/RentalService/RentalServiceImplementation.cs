using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using RentalInterface;
using System.Security.Principal;

namespace RentalService
{
    public class RentalServiceImplementation:IRental
    {
        [OperationBehavior(TransactionAutoComplete=true,
                           TransactionScopeRequired=true)]
        public string RegisterCarRental(RentalRegistration rentalRegistration)
        {
            Console.WriteLine("RegisterCarRental");

            if (rentalRegistration == null)
            {
                RentalRegisterFault fault;
                fault = new RentalRegisterFault();
                fault.FaultID = 1;
                fault.FaultDescription = "Input is not valid,got null value";
                throw new FaultException<RentalRegisterFault>(fault," ");
            }
            try
            {

                using (DataClassesRentalDataContext ctx = new DataClassesRentalDataContext())
                {
                    Rental rentalToInsert;
                    rentalToInsert = new Rental();
                    rentalToInsert.CustomerID = rentalRegistration.CustomerID;
                    rentalToInsert.CarID = rentalRegistration.CarID;
                    rentalToInsert.Comments = rentalRegistration.Comments;
                    ctx.Rental.InsertOnSubmit(rentalToInsert);
                    ctx.SubmitChanges();

                    return "OK";
                }
              
            }
            catch (Exception ex)
            {
                RentalRegisterFault fault;
                fault = new RentalRegisterFault();
                fault.FaultID = 123;
                fault.FaultDescription = "An error occurreed while inserting the registration";
                throw new FaultException<RentalRegisterFault>(fault, " ");
            }
           
        }

        [OperationBehavior(Impersonation=ImpersonationOption.Required)]
        public void RegisterCarRentalAsPaid(string rentalID)
        {
            Console.WriteLine("RegisteerCarRentalAsPaid "+rentalID);
            Console.WriteLine("WindowsIdentity:{0}",WindowsIdentity.GetCurrent().Name);
        }

        public void StartCarRental(string rentalID)
        {
 	        throw new NotImplementedException();
        }

        public void StopCarRental(string rentalID)
        {
 	        throw new NotImplementedException();
        }

        public RentalRegistration GetRentalRegistration(string rentalID)
        {
 	        throw new NotImplementedException();
        }
}
}
