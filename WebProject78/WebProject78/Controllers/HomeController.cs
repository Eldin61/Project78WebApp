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
            roomInfo();


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

            List<String> names = new List<String>();
            for(var i = 0; i < d.Count; i++)
            {
                names.Add(d[i]["voornaam"] + " " + d[i]["achternaam"]);               
            }

            ViewBag.nameList = names; 
            System.Diagnostics.Debug.WriteLine("testcount: " + d.Count);
            //System.Diagnostics.Debug.WriteLine("Achternaam: " + d[0]["achternaam"]);
        }

        public void roomInfo()
        {
            String constring = "server=localhost;user id=root;database=classicmodels; password=root";
            Double avg = 0;

            MySqlConnection con = new MySqlConnection(constring);

            try
            {
                con.Open();

                String sqlCmd = "SELECT  AVG(priceEach) FROM orderdetails";
                MySqlCommand cmd = new MySqlCommand(sqlCmd, con);

                avg = Double.Parse(cmd.ExecuteScalar()+ "");

                ViewBag.avgtest = avg;

            }
            catch (MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
            }
            finally
            {
                con.Close();
            }

        }
    }
}