using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Windows.Forms;

namespace RentalApplication
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnRegisterCarRental_Click(object sender, EventArgs e)
        {
            try
            {
                RentalProxy rentalProxy;
                rentalProxy = new RentalProxy();
                RentalInterface.RentalRegistration rentalRegistration;
                rentalRegistration = new RentalInterface.RentalRegistration();
                rentalRegistration.CustomerID = 1;
                rentalRegistration.CarID = "123767";

                rentalRegistration.DropOffLocation = 1327;
                rentalRegistration.DropOffDateTime = System.DateTime.Now;

                rentalRegistration.PickUpLocation = 7633;
                rentalProxy.RegisterCarRental(rentalRegistration);
            }
            catch (FaultException<RentalInterface.RentalRegisterFault> rentalRegisterFault)
            {
                MessageBox.Show("rentalRegisterFault " + rentalRegisterFault.Message);

            }
            catch (FaultException faultException)
            {
                MessageBox.Show("faultException " + faultException.Message);
            }
            catch (EndpointNotFoundException endpointNotFoundException)
            {
                MessageBox.Show("endpointNotFoundExc " + endpointNotFoundException.Message);
            }
            catch(CommunicationException commuincationException)
            {
                MessageBox.Show("communicationException "+commuincationException.Message);
            }
        }

        private void btnRegisterCarRentalAsPaid_Click(object sender, EventArgs e)
        {
            try
            {
                RentalProxy rentalProxy;
                rentalProxy = new RentalProxy();

                rentalProxy.RegisterCarRentalAsPaid("1876893");
            }
            catch (Exception ex)
            {
                
                MessageBox.Show(ex.Message);
            }
        }
    }
}
