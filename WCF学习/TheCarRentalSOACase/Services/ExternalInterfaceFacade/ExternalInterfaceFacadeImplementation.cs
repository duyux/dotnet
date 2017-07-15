using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;
using ExternalInterface;
using System.Transactions;

namespace ExternalInterfaceFacade
{
    public class ExternalInterfaceFacadeImplementation:IExternalInterface
    {
        public void SubmitRentalContract(RentalContract rentalContract)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                NetNamedPipeBinding netNamedPipeBinding;
                netNamedPipeBinding = new NetNamedPipeBinding();
                netNamedPipeBinding.TransactionFlow = true;

                CustomerInterface.ICustomer customerServiceChannel;
                customerServiceChannel = ChannelFactory<CustomerInterface.ICustomer>.CreateChannel(netNamedPipeBinding,new EndpointAddress("net.pipe://localhost/customerservice"));

                int newCustomerID;
                newCustomerID = customerServiceChannel.RegisterCustomer(rentalContract.Customer);

                RentalInterface.IRental rentalServiceChannel;
                rentalServiceChannel = ChannelFactory<RentalInterface.IRental>.CreateChannel(netNamedPipeBinding, new EndpointAddress("net.piped://localhost/rentalservice"));
                rentalServiceChannel.RegisterCarRental(rentalContract.RentalRegistration);
                scope.Complete();
            }
        }
   }
}
