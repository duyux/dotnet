using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;

namespace CarManagementInterface
{
   [ServiceContract]
    public interface ICarManagement
    {
       [OperationContract]
       int InsertNewCar(Car car);
       
       [OperationContract]
       bool RemooveCar(Car car);

       [OperationContract]
       void UpdateMilage(Car car);

       [OperationContract]
       List<Car> ListCars();

       [OperationContract]
       byte[] GetCarPicture(string carID);
    }

    [DataContract]
   public enum TransmissionTypeEnum //表示汽车的变速箱
   { 
        [EnumMember]
        Manual,
        [EnumMember]
        Automatic
   }
    [DataContract]
    [KnownType(typeof(LuxuryCar))]
    [KnownType(typeof(SportsCar))]
    public class Car
    {
        [DataMember]
        public string BrandName { get; set; }
        [DataMember]
        public string TypeName { get; set; }
        [DataMember]
        public TransmissionTypeEnum Transmission { get; set; }
       [DataMember]
        public int NumberOfDoors { get; set; }
        [DataMember]
        public int MaxNumberOfPersons { get; set; }
        [DataMember]
        public int LitersOfLuggage { get; set; }
 
    }

    [DataContract]
    public class LuxuryCar : Car
    {
        [DataMember]
        List<LuxuryItems> LuxuryItemsList { get; set; }
    }

    [DataContract]
    public class LuxuryItems
    {
        [DataMember]
        public string ItemName { get; set; }
        [DataMember]
        public string ItemdDescription { get; set; }
    }

    [DataContract]
    public class SportsCar : Car
    {
        [DataMember]
        public int HorsePower { get; set; }
    }
}
