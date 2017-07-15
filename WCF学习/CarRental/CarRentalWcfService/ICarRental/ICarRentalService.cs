using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace Wrox.CarRentalService.Contracts
{
    [ServiceContract()]
   public  interface ICarRentalService
    {
        [OperationContract]
        double CalculatePrice(DateTime pickupDate, DateTime returnDate, string pickupLocation, string vehicllePreferenct);
    }
}
