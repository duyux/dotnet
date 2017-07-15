using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PostSharp.Aspects;

namespace HelloAOP
{
    [Serializable]
    class MyAspect:OnMethodBoundaryAspect
    {
        public override void OnEntry(MethodExecutionArgs args)
        {
            Console.WriteLine("Before the method");
        }
        public override void OnExit(MethodExecutionArgs args)
        {
            Console.WriteLine("After the method");
        }
    }
}
