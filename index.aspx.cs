using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

namespace college_event_media
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void log_btn_Click(object sender, EventArgs e)
        {
            if(txt_name.Text=="Admin" && txt_password.Text=="Samsung@753")
            {
                ClientScript.RegisterStartupScript(this.GetType(), "Login Successfully....", "alert('username or password or incorrect');" ,true);
            }
            else
            {
                SqlConnection conn_obj = new SqlConnection();
                conn_obj.ConnectionString = "Data Source=(LocalDB)\\v11.0;AttachDbFilename=E:\\prj_tharun\\college_event_media\\clg_eve_med_db.mdf;Integrated Security=True;Connect Timeout=30";
                conn_obj.Open();
                SqlCommand cmd_obj = new SqlCommand();
                cmd_obj.Connection = conn_obj;
                cmd_obj.CommandText = 
                    err_msg.Visible = true;
                    err_msg.Text = "Register Successfully...";
                }
                else
                {
                    err_msg.Visible = true;
                    err_msg.Text = "Register Unsuccessfully try again..";

                }
                conn_obj.Close();

            }

        }
    }
}