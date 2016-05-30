using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace WebProject78.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            MySqlConnection con = new MySqlConnection("server=localhost;user id=root;database=classicmodels; password=root");
            con.Open();

            MySqlCommand query = new MySqlCommand("SELECT contactFirstName, contactLastName FROM customers", con);
            MySqlDataAdapter adp = new MySqlDataAdapter(query);
            DataSet ds = new DataSet();
            adp.Fill(ds);

            List<String> list = ds.Tables[0].AsEnumerable()
                .Select(r => r.Field<String>("contactFirstName"))
                .ToList();

            ViewBag.List = list;

            //List<String> test = new List<String>();

            //test.Add("een");
            //test.Add("twee");
            //test.Add("drie");
            //ViewBag.List = test;

            return View();

        }
        public ActionResult logintest(FormCollection form)
        {
            var naam = form["username"];
            var password = form["password"];

            return View();
        }

        public String test2(String name)
        {
            String username = name;

            return HttpUtility.HtmlEncode(username);
        }

        public ActionResult whatever(FormCollection form)
        {
            var naam = form["username"];

            return Redirect("/Test/test2?name=" + naam);
        }
    }

}