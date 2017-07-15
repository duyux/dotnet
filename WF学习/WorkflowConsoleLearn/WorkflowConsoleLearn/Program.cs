using System;
using System.Linq;
using System.Activities;
using System.Activities.Statements;
using System.Collections.Generic;

namespace WorkflowConsoleLearn
{

    class Program
    {
        static void Main(string[] args)
        {
            Activity workflow1 = new Workflow1();

            var wfArg = new Dictionary<string, Object>();
            wfArg.Add("argInAge", 39);

            WorkflowInvoker.Invoke(workflow1,wfArg);
            Console.ReadKey();
        }
    }
}
