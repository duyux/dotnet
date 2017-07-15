using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;

using System.Runtime.Serialization;
using CarManagementService;
using CustomerService;
using RentalService;
using ExternalInterfaceFacade;

namespace HostAllServices
{
    class Program
    {
        static ServiceHost CarManagemnetServiceHost;
        static ServiceHost CustomerServiceHost;
        static ServiceHost RentalServiceHost;
        static ServiceHost ExternalServiceHost;
        static void Main(string[] args)
        {
            Console.WriteLine("ServiceHost");
            try
            {
                CarManagemnetServiceHost = new ServiceHost(typeof(CarManagementService.CarManagementImplementation));
                CarManagemnetServiceHost.Open();

                CustomerServiceHost = new ServiceHost(typeof(CustomerService.CustomerServiceImplementation));
                CustomerServiceHost.Open();

                RentalServiceHost = new ServiceHost(typeof(RentalService.RentalServiceImplementation));
                RentalServiceHost.Open();

                ExternalServiceHost = new ServiceHost(typeof(ExternalInterfaceFacade.ExternalInterfaceFacadeImplementation));
                ExternalServiceHost.Open();

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.WriteLine("Started");
            Console.ReadKey();
        }
    }
}
