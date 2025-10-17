import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() 
{

  const [search,setSearch]=useState(' ');

  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);

  const localData=async()=>
  {
    let response=await fetch("http://localhost:5000/api/foodData",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        }
      }
    );
    response=await response.json();
    //response0 means fooditem  and response1 means foodcategory
    setFoodItem(response[0] );
    setFoodCat(response[1] );

    //console.log(response[0],response[1]);
  }

  useEffect(()=>
  {
    localData()
  },[])

  return (
    <div>
      <div><Navbar/></div>

    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVxdWV8ZW58MHx8MHx8fDA%3D" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>

    {/* //video 9 */}
      <div className='container'>
        {
        foodCat !=[]
        ? foodCat.map((data)=>
        {
          return (<div className='row mb-3' key={data._id}>
          <div  className="fs-3 m-3">{data.CategoryName}</div>
          <hr />
          {/* humeh category name ke andhar uss data ko dikhana ha */}
          {foodItem != [] ? foodItem.filter((item)=>(item.CategoryName === data.CategoryName)  && (item.name.toLowerCase().includes(search.toLocaleLowerCase())) )
          .map(filterItems=>{return(
            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
              {/* from mongo db */}
              <Card foodItem={filterItems}
              options={filterItems.options[0]}
              ></Card>
            </div>
          )})
          : <div> No Such Data Found</div>}
          </div>
          )
        })
        :" "
      }
        
        </div>

      <div><Footer/></div>
    </div>
  )
}
