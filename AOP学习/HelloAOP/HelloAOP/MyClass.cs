using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HelloAOP
{
    class MyClass
    {
        [MyAspect]
        public void MyMethod()
        {
            Console.WriteLine("Hello,World!");
           // Console.ReadKey();
        }
    }
}
