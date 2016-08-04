using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Moonshine.Slurm.Web.Startup))]
namespace Moonshine.Slurm.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
