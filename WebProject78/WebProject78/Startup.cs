using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebProject78.Startup))]
namespace WebProject78
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
