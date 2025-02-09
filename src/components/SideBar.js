import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { toggleSideBar } from '../utils/configSlice';
import { fetchTeams, getImagePath } from '../utils/helperFunction';

const SideBar = () => {
  const dispatch = useDispatch();
  const [mouseOver,setMouseOver] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const handleMouseEnter = () => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
    dispatch(toggleSideBar(false));
  };
  useEffect(() => {
    fetchTeams(setTeams);//read teams name from server side (TeamsJosn.json)
  }, []);
  const isSidebarEnable = mouseOver;

  return teams && teams.length > 0 && (
    <div className={`flex flex-col min-h-screen bg-[#0077a1] transition-all duration-500 ${isSidebarEnable? 'w-36' : 'w-14'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ul className='flex flex-col justify-center items-center space-y-6 p-2  mt-2'>
            <li className={`text-white font-medium transition-all duration-500 ${isSidebarEnable? 'text-center' : ''}`}>
              <i className="fa-solid fa-chart-simple"></i>
            </li>
            <Link to="/">
              <li className={`text-white font-medium cursor-pointer flex items-center transition-all duration-500 ${isSidebarEnable ? 'flex-col' : ''} ease-in-out`}>
                <i className="fas fa-chart-pie mr-2"></i> {(isSidebarEnable) && 'Summary'}
              </li>
            </Link>
            {teams.map((team) => (
              <Link to={`/${team.name}`} target="_blank" rel="noopener noreferrer" key={team}>
                <li className={`text-white font-medium flex items-center justify-center cursor-pointer transition-all duration-500 ${isSidebarEnable ? 'flex-col' : ''} ease-in-out`}>
                  <img src={getImagePath(team.icon)} alt={team.name} className={`${isSidebarEnable ? 'w-6 h-6 mb-2' : 'w-8 h-8'}`} />
                  {isSidebarEnable && team.name}
                </li>
              </Link>
            ))}
            {/*<Link to="/compare">
              <li className={`text-white font-medium flex items-center justify-center cursor-pointer transition-all duration-500 ${isSidebarEnable ? 'flex-col' : ''}`}>
                <i className="fas fa-exchange-alt mr-2"></i> {(isSidebarEnable) && 'Comparison'}
              </li>
            </Link>*/}
        </ul>
    </div>
  )
}

export default SideBar