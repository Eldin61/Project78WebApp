using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace WebProject78.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title="Project 78";
            employeeList();
            roomInfo();
            return View();
        }

        public void employeeList()
        {
            //moet nog netter
            String constring = "server=localhost;user id=root;database=classicmodels; password=root";
            MySqlConnection con = new MySqlConnection(constring);

            try {
                con.Open();

                String sqlcmd = "SELECT contactFirstName, contactLastName FROM customers";
                MySqlCommand cmd = new MySqlCommand(sqlcmd, con);
                MySqlDataAdapter adp = new MySqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adp.Fill(ds);

                List<String> list = ds.Tables[0].AsEnumerable()
                    .Select(r => r.Field<String>("contactFirstName") + " " +  r.Field<String>("contactLastName"))
                    .ToList();

                ViewBag.List = list;
            } catch(MySqlException e)
            {
                System.Diagnostics.Debug.WriteLine("oops");
                System.Diagnostics.Debug.WriteLine(e.ToString());

            }
            finally
            {
                con.Close();
            }

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