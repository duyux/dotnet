using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using CarManagementInterface;
using System.IO;

namespace CarManagementService
{
    public class CarManagementImplementation:ICarManagement
    {
        public int InsertNewCar(Car car)
        {
            Console.WriteLine("InsertNewCar "+car.BrandName+""+car.TypeName);
            return 1;
        }

        public bool RemooveCar(Car car)
        {
            Console.WriteLine("RemoveCar "+car.BrandName+" "+car.TypeName);
            return true;
        }

        public void UpdateMilage(Car car)
        {
            Console.WriteLine("UpdateMilage "+car.BrandName+" "+car.TypeName);
        }

        public List<Car> ListCars()
        {
            Console.WriteLine("ListCars");
            List<Car> listCars;
            listCars = new List<Car>();
            listCars.Add(new Car { 
              BrandName="Audi",
              Transmission=TransmissionTypeEnum.Automatic,
              TypeName="A4"
            });
            listCars.Add(new Car { 
              BrandName="Volkswagen",
              Transmission=TransmissionTypeEnum.Automatic,
              TypeName="Golf"
            });
            listCars.Add(new SportsCar { 
             BrandName="Ferrari",
             Transmission=TransmissionTypeEnum.Automatic,
             TypeName="XXXX",HorsePower=600
            });
            return listCars;
        }

        public byte[] GetCarPicture(string carID)
        {
            Console.WriteLine("GetCarPicture");
            byte[] buff;

            string pathToPicture;
            pathToPicture = @"E:\学习\src\WCF学习\TheCarRentalSOACase\Data\carexample.jpg";

            FileStream fileStream = new FileStream(pathToPicture,FileMode.Open,FileAccess.Read);
            BinaryReader binaryReader = new BinaryReader(fileStream);
            buff = binaryReader.ReadBytes((int)fileStream.Length);

            return buff;
        }
    }
}
