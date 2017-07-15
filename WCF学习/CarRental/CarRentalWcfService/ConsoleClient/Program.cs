using ConsoleClient.CarRentalReference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace ConsoleClient
{
    class Program
    {
        static void Main(string[] args)
        {
           
            using (CarRentalServiceClient client=new CarRentalServiceClient())
            {
                double price = client.CalculatePrice(DateTime.Now, DateTime.Now.AddDays(5), "Gazze", "pickup");
                Console.WriteLine("Prince {0}",price);
                Console.ReadKey();
            }

        }
    }
}
