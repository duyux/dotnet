using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using RentalInterface;

namespace RentalApplication
{
    class RentalProxy:ClientBase<IRental>,IRental
    {
        public RentalProxy()
            : base("RentalSeriveEndPoint")
        { 
        }
        public string RegisterCarRental(RentalRegistration rentalRegistration)
        {
            return Channel.RegisterCarRental(rentalRegistration);
        }

        public void RegisterCarRentalAsPaid(string rentalID)
        {
            Channel.RegisterCarRentalAsPaid(rentalID);
        }

        public void StartCarRental(string rentalID)
        {
            Channel.StartCarRental(rentalID);
        }

        public void StopCarRental(string rentalID)
        {
            Channel.StopCarRental(rentalID);
        }

        public RentalRegistration GetRentalRegistration(string rentalID)
        {
            return Channel.GetRentalRegistration(rentalID);
        }
    }
}
