using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using System.Net;
using Newtonsoft.Json.Linq;

namespace WebProject78.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            ViewBag.Title="Project 78";
            employeeList();

            //List<String> fakeUserList = new List<string>();
            //fakeUserList.Add("Eldin");
            //fakeUserList.Add("Daniel");
            //fakeUserList.Add("Orlando");
            //fakeUserList.Add("Mark");
            //fakeUserList.Add("Rene");

            //ViewBag.userList = fakeUserList;
            //ViewBag.Title = "Project 78";

            return View();
        }

        public void employeeList()
        {
            WebClient c = new WebClient();
            var data = c.DownloadString("http://145.24.222.188/p/index.php/werknemers");
            System.Diagnostics.Debug.WriteLine(data);

            JObject o = JObject.Parse(data);
            JArray d = (JArray)o["data"]; //pakt alleen de data, verder nog index en item nodig

            List<Tuple<JToken, String>> names = new List<Tuple<JToken, String>>();
            for(var i = 0; i < d.Count; i++)
            {

                names.Add(Tuple.Create(d[i]["UID"] ,d[i]["voornaam"] + " " + d[i]["achternaam"]));               
            }
            var tuplenames = names.Select(t => t.Item2).ToList(); //haalt namen uit de tuples met linq

            seatUsers();
            //ViewBag.nameList = tuplenames; 
            System.Diagnostics.Debug.WriteLine("testcount: " + d.Count);
            //System.Diagnostics.Debug.WriteLine("Achternaam: " + d[0]["achternaam"]);
        }

        public List<String> seatUsers()
        {
            List<Tuple<String, String>> seats = new List<Tuple<String, String>>();

            WebClient c = new WebClient();
            var data = c.DownloadString("http://145.24.222.188/p/index.php/arduinocheck");

            JObject o = JObject.Parse(data);
            JArray d = (JArray)o["data"];

            for(var i = 0; i < d.Count; i++)
            {
                seats.Add(Tuple.Create(d[i]["B"].ToString(), d[i]["U"].ToString()));
            }

            for(var i = 0; i < seats.Count; i++)
            {
                if(seats[i].Item1 == "0")
                {
                    seats.RemoveAt(i);
                }
            }
            var userid = seats.Select(t => t.Item2).ToList();

            ViewBag.nameList = userid;
            return userid;
        }

  
    }
}