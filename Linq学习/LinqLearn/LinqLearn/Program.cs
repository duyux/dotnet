using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Reflection;
using System.Linq.Expressions;

namespace LinqLearn
{
    class Program
    {
        static void Main(string[] args)
        {
            // LearnFirst();

            //ProceeFilms();

            LearnExpression();
        }
        void LearnFirst()
        {
            MethodInfo[] methods = typeof(string).GetMethods();
            var result = from m in methods
                         where m.IsStatic != true
                         group m by m.Name into g
                         select new {MethodName=g.Key,Overload=g.Count() };
           foreach(var r in result)
           {
               Console.WriteLine(r.ToString());
           }
           Console.ReadLine();

           
        }


       static void ProceeFilms()
        {
            var films = new List<Film>
            {
                new Film {Name="Jaws",Year=1975 },
                new Film {Name="Singing in the Rain",Year=1986 },
                new Film {Name="Some Like it Hot",Year=1959 }
            };

            Action<Film> print = 
                film => Console.WriteLine("Name={0},Year={1}",film.Name,film.Year);

            films.ForEach(print);

            films.FindAll(film => film.Year < 1960).ForEach(print);
            films.Sort((f1,f2) => f1.Name.CompareTo(f2.Name));
            films.ForEach(print);

            Console.ReadKey();

        }

        static void LearnExpression()
        {
            Expression arg1 = Expression.Constant(2);
            Expression arg2 = Expression.Constant(3);
            Expression add = Expression.Add(arg1, arg2);

            Func<int> compiled = Expression.Lambda<Func<int>>(add).Compile();


            Console.WriteLine(compiled());
            Console.ReadKey();
        }
    }

    class Film
    {
        public string Name { get; set; }
        public int Year { get; set; }
    }
}
