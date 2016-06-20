using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using WebProject78.Models;

namespace WebProject78.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            ViewBag.Title = "Project 78";
            employeeList();

            return View();
        }

        public void employeeList()
        {
            WebClient c = new WebClient();
            var data = c.DownloadString("http://145.24.222.188/p/index.php/werknemers");

            JObject o = JObject.Parse(data);
            JArray d = (JArray)o["data"]; //pakt alleen de data, verder nog index en item nodig
            Dictionary<String, Dictionary<String, String>> keyValueUser = new Dictionary<string, Dictionary<String, String>>();
            var confirmedusers = seatUsers();
            var employees = new List<Employee>();

            List<Tuple<String, String>> names = new List<Tuple<String, String>>();
            for (var i = 0; i < d.Count; i++)
            {

                names.Add(Tuple.Create(d[i]["UID"].ToString(), d[i]["voornaam"] + " " + d[i]["achternaam"]));
                Dictionary<String, String> temp = new Dictionary<string, string>();
                
                var email = d[i]["email"].ToString();
                var rol = d[i]["rol"].ToString();
                var uid = d[i]["UID"].ToString();
                var telnr = d[i]["telefoonnummer"].ToString();
                var beschrijving = d[i]["beschrijving"].ToString();
                var voornaam = d[i]["voornaam"].ToString();
                var achternaam = d[i]["achternaam"].ToString();
                employees.Add(new Employee(voornaam, achternaam, uid, email, beschrijving, telnr));
            }
            
            var onlineusers = new List<String>();
            var offlineusers = new List<String>();
            var idlist = names.Select(t => t.Item1).ToList();

            //offlineusers =
            //    from nm in names
            //    where !confirmedusers.Any(x => x.ToString() == nm.Item1)
            //    select nm.Item2.ToList;


            //ghetto for loop maar werkt, moet beter met linq
            for (var i = names.Count - 1; i > -1; i--) //backwards loop laat stuff verwijderen maar behoudt OG index
            {
                for (var j = 0; j < confirmedusers.Count; j++)
                {
                    if (confirmedusers[j] == idlist[i])
                    {
                        onlineusers.Add(names[i].Item2);
                        names.RemoveAt(i);
                    }

                }
            }
            //var onlineTest = confirmedusers.Intersect(idlist);
            //foreach(var user in onlineTest)
            //{
            //    onlineusers.Add(user);
            //}
            // zoiets zou mooier zijn en kunnen werken als seatUsers() namen returned.
            

            offlineusers = names.Select(t => t.Item2).ToList();

            onlineusers.Sort();
            offlineusers.Sort();

            

            var tuplenames = names.Select(t => t.Item2).ToList(); //haalt namen uit de tuples met linq

            ViewBag.onlineList = onlineusers;
            ViewBag.offlineList = offlineusers;
            ViewBag.testId = idlist;
            ViewBag.testList = employees;

        }

        public List<String> seatUsers()
        {
            List<Tuple<String, String>> seats = new List<Tuple<String, String>>();

            WebClient c = new WebClient();
            var data = c.DownloadString("http://145.24.222.188/p/index.php/arduinocheck");

            JObject o = JObject.Parse(data);
            JArray d = (JArray)o["data"];

            for (var i = 0; i < d.Count; i++)
            {
                seats.Add(Tuple.Create(d[i]["B"].ToString(), d[i]["U"].ToString()));
            }

            for (var i = 0; i < seats.Count; i++)
            {
                if (seats[i].Item1 == "0")
                {
                    seats.RemoveAt(i);
                }
            }
            var userid = seats.Select(t => t.Item2).ToList();
            return userid;
        }


    }
}