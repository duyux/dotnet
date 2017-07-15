using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace CarApplication
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnListCars_Click(object sender, EventArgs e)
        {
            try
            {
                CarService.CarManagementClient client;
                client = new CarService.CarManagementClient();
                List<CarService.Car> listCars;
                listCars = client.ListCars();
                foreach (CarService.Car car in listCars)
                {
                    listBox1.Items.Add(car.BrandName+" "+car.TypeName);
                }
            }
            catch (Exception ex)
            {
                textBox1.Text = ex.Message;
            }
        }

        private void btnInsertNewCar_Click(object sender, EventArgs e)
        {
            try
            {
                CarService.CarManagementClient client;
                client = new CarService.CarManagementClient();
                CarService.Car car;
                car = new CarApplication.CarService.Car();
                car.BrandName = "BMW";
                car.TypeName = "320d";
                int newCarID;
                newCarID = client.InsertNewCar(car);

            }
            catch (Exception ex)
            {
                textBox1.Text = ex.Message;
            }
        }

        private void btnGetCarPicture_Click(object sender, EventArgs e)
        {
            try
            {
                CarService.CarManagementClient client;
                client = new CarService.CarManagementClient();
                byte[] buff;
                buff = client.GetCarPicture("C67872");
                TypeConverter typeConverter;
                typeConverter = TypeDescriptor.GetConverter(typeof(Bitmap));
                Bitmap bitmap = (Bitmap)typeConverter.ConvertFrom(buff);
                pictureBox1.Image = bitmap;
            }
            catch (Exception ex)
            {
                textBox1.Text = ex.Message;
            }
        }
    }
}
