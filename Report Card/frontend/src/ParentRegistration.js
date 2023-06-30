import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import ParentLogin from './ParentLogin.js'
import Home from './Home.js';
import './eye.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const ParentRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const root=ReactDOM.createRoot(document.getElementById('root'));

  
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');


  const stateCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kadapa', 'Tirupati', 'Anantapur', 'Rajahmundry', 'Kakinada', 'Tirumala', 'Eluru', 'Ongole', 'Vizianagaram', 'Machilipatnam', 'Adoni', 'Tenali', 'Proddatur', 'Chittoor', 'Hindupur', 'Bhimavaram', 'Madanapalle', 'Guntakal', 'Dharmavaram', 'Gudivada', 'Srikakulam', 'Nandyal', 'Tadipatri', 'Kavali', 'Puttur', 'Palasa', 'Tadepalligudem', 'Rajampet', 'Rayachoti', 'Srikalahasti', 'Pithapuram', 'Narasaraopet', 'Nellimarla', 'Tuni', 'Vinukonda', 'Jaggayyapeta', 'Mandapeta', 'Venkatagiri', 'Narasapuram', 'Repalle', 'Bobbili', 'Nuzvid', 'Markapur', 'Ponnur', 'Kadiri', 'Gudur', 'Sullurpeta', 'Bapatla', 'Sadasivpet', 'Nagari', 'Kovvur', 'Pedana', 'Nandikotkur', 'Addanki', 'Macherla', 'Amalapuram', 'Rayadurg'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Aalo', 'Tezu', 'Khonsa', 'Roing', 'Changlang', 'Namsai', 'Seppa', 'Anini', 'Yingkiong', 'Daporijo', 'Hayuliang', 'Koloriang', 'Mechuka', 'Tuting', 'Tawang', 'Nacho', 'Taliha', 'Tawang', 'Jairampur', 'Nirjuli', 'Tali', 'Anjaw', 'Yingkiong', 'Deomali', 'Tirap'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Karimganj', 'Hailakandi', 'Diphu', 'Sivasagar', 'Goalpara', 'Barpeta', 'Lakhimpur', 'Mangaldoi', 'Dhubri', 'Duliajan', 'Nalbari', 'Bongaigaon', 'Sonari', 'NorthLakhimpur', 'Dhemaji', 'Dhubri', 'Dhekiajuli', 'Dhuburi', 'Dibrugarh', 'Digboi', 'Diphu', 'DoomDooma', 'DumDuma', 'Gauripur', 'Goalpara', 'Gohpur', 'Golaghat', 'Gossaigaon', 'Guwahati', 'Hailakandi'],
   'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Arrah', 'Begusarai', 'Chapra', 'Purnia', 'Katihar', 'Munger', 'Samastipur', 'BiharSharif', 'Saharsa', 'Hajipur', 'Dehri', 'Siwan', 'Motihari', 'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur', 'Jehanabad', 'Aurangabad', 'Lakhisarai', 'Arwal', 'Sheikhpura', 'Madhubani', 'Supaul', 'Sheohar', 'Bhabua', 'Banka', 'Bettiah', 'Sasaram', 'Barh', 'Barbigha', 'Rosera', 'Lalganj', 'Narkatiaganj', 'Mokameh', 'Gopalganj', 'Khairagarh', 'Mahnar', 'Begusarai', 'Bikram', 'Bikramganj', 'Buxar', 'Chhapra', 'Dalsinghsarai', 'Danapur', 'Darbhanga', 'Dehri', 'Dhaka', 'Dighwara'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund', 'Dhamtari', 'Kirandul', 'Bhatapara', 'Kanker', 'NailaJanjgir', 'TildaNewra', 'Tilda', 'Jashpurnagar', 'Bhatgaon', 'Mungeli', 'BadeBacheli', 'Kumhari', 'Khairagarh', 'Simga', 'Pathalgaon', 'Kawardha', 'Basna', 'Patan', 'Tikrapara', 'Chhuikhadan', 'Gandai', 'Lingiyadih', 'Saragaon', 'Bagicha', 'Balkrishnapur', 'Champajharan', 'DalliRajhara', 'Gidam', 'Gogaon', 'Kharod', 'Kirodimalnagar', 'Kunkuri', 'Lakholi', 'Moga', 'Udaipur'],
    'Goa': ['Panaji', 'Vasco', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Valpoi', 'Cortalim', 'Pernem', 'Cansaulim', 'Quepem', 'Cuncolim', 'Aldona', 'Mormugao', 'DonaPaula', 'Cuncolim', 'Chicalim', 'Mandrem', 'Mormugao', 'Benaulim', 'Varca', 'Agonda', 'Arambol', 'Canacona', 'Colva', 'Curchorem', 'Dabolim', 'Mapusa', 'Margao', 'Panaji', 'Pernem', 'Porvorim'],
     'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Gandhidham', 'Nadiad', 'Morbi', 'Surendranagar', 'Anand', 'Navsari', 'Bharuch', 'Porbandar', 'Godhra', 'Vapi', 'Valsad', 'Ankleshwar', 'Amreli', 'Dahod', 'Bhuj', 'Gandhidham', 'Mehsana', 'Himmatnagar', 'Palanpur', 'Veraval', 'Patan', 'Deesa', 'Botad', 'Kadi', 'Jetpur', 'Wadhwan', 'Vyara', 'Visnagar', 'Keshod', 'Mandvi', 'Kalol', 'Keshod', 'Vijapur', 'Sanand', 'Savarkundla', 'Jamkhambhalia', 'Mangrol', 'Vadnagar', 'Salaya', 'Tharad', 'Nadiad', 'Viramgam', 'Modasa', 'Porbandar', 'Bhavnagar'],
    'Haryana': ['Faridabad', 'Gurugram', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula', 'Kurukshetra', 'Sirsa', 'Bhiwani', 'Bahadurgarh', 'Jind', 'Kaithal', 'Rewari', 'Palwal', 'Fatehabad', 'Gohana', 'Tohana', 'Narnaul', 'Hansi', 'Narwana', 'FirozpurJhirka', 'CharkhiDadri', 'MandiDabwali', 'Shahabad', 'Pehowa', 'Dabwali', 'Samalkha', 'Pinjore', 'Naraingarh', 'Sohna', 'Taraori', 'Thanesar', 'KalanWali', 'Kosli', 'Tosham', 'Mahendragarh', 'Faridabad', 'Gurugram', 'Panchkula', 'Hisar', 'Rohtak', 'Panipat', 'Yamunanagar', 'Sonipat', 'Karnal', 'Ambala', 'Sirsa', 'Bhiwani', 'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal'],
    'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan', 'Nahan', 'Bilaspur', 'Chamba', 'Dalhousie', 'Kullu', 'Hamirpur', 'Una', 'Palampur', 'Kangra', 'Nurpur', 'PaontaSahib', 'Arki', 'Sundernagar', 'Sarkaghat', 'Jogindernagar', 'Rampur', 'Kasauli', 'Kalpa', 'Banjar', 'Sarahan', 'Kandaghat', 'Rohru', 'Baddi', 'Chail', 'NagrotaBagwan', 'Parwanoo', 'Rajgarh'],
     'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Phusro', 'Giridih', 'Ramgarh', 'Medininagar', 'Chirkunda', 'Gumia', 'Ghatshila', 'Chatra', 'Dumka', 'Garhwa', 'Saunda', 'Madhupur', 'JhumriTilaiya', 'Lohardaga', 'TenuDamCumKathhara', 'Bundu', 'Pakaur', 'Bhawanathpur', 'Sahibganj', 'Barughutu', 'Mihijam', 'Palamu', 'Chandil', 'Simdega', 'Khunti', 'Nawada', 'Suri', 'Mughalsarai', 'Daltonganj', 'Gumla', 'Latehar', 'Bishrampur', 'Barkatha', 'Saraikela', 'Rajmahal', 'Panki', 'Sahibganj', 'Chaibasa', 'Dhanwar', 'Churi', 'Godda', 'Bhawanathpur', 'Chakradharpur', 'Birnagar', 'Barhi', 'PurbiSinghbhum', 'Garhwa'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Vijayapura', 'Shivamogga', 'Tumakuru', 'Davanagere', 'Raichur', 'Hassan', 'Bidar', 'Gadag-Betigeri', 'Udupi', 'Chitradurga', 'Chikkamagaluru', 'Bagalkote', 'Hospet', 'Shimoga', 'Gulbarga', 'Bijapur', 'Ramanagara', 'Haveri', 'Kolar', 'Mandya', 'Chamarajanagar', 'Koppal', 'Chikkaballapur', 'Chitradurga', 'Dandeli', 'Bhatkal', 'Gundlupet', 'Sargur', 'Narasimharajapura', 'Mysore', 'Puttur', 'Koteshwar', 'Sakleshpur', 'Siddapur', 'Sringeri', 'Mudigere', 'Kumta', 'Honavar', 'Kundapur', 'Udupi', 'Brahmakumaris', 'Kannur', 'Bantval', 'Madikeri', 'Mangalore'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam', 'Kasaragod', 'Malappuram', 'Pathanamthitta', 'Aluva', 'Munnar', 'Adoor', 'Thodupuzha', 'Kanhangad', 'Attingal', 'Kayamkulam', 'Nedumangad', 'Palai', 'Ponnani', 'Taliparamba'],
     'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Morena', 'Bhind', 'Guna', 'Shivpuri', 'Vidisha', 'Chhindwara', 'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Itarsi', 'Sehore', 'Jhabua', 'Betul', 'Nagda', 'Katni', 'Seoni', 'Hoshangabad', 'Harda', 'AshokNagar', 'Dhar', 'Shajapur', 'Mungaoli', 'BinaEtawa', 'Gadarwara', 'Panna', 'Anuppur', 'Singoli', 'Sendhwa', 'AshokNagar', 'Narsinghpur', 'Shahdol', 'Shajapur', 'Khurai', 'Sarni', 'Jhabua', 'Guna', 'Pithampur', 'Shivpuri'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kalyan-Dombivli', 'Vasai-Virar', 'Bhiwandi', 'Amravati', 'Nanded', 'Kolhapur', 'Sangli', 'Malegaon', 'Jalgaon', 'Akola', 'Latur', 'Ahmednagar', 'Dhule', 'Ichalkaranji', 'Chandrapur', 'Parbhani', 'Jalna', 'Bhusawal', 'NaviMumbai', 'Panvel', 'Satara', 'Beed', 'Yavatmal', 'Kamptee', 'Gondiya', 'Barshi', 'Achalpur', 'Osmanabad', 'Nandurbar', 'Wardha', 'Udgir', 'Hinganghat', 'Parli', 'Ambajogai', 'Gadhinglaj', 'Ratnagiri', 'Sangamner', 'Pusad', 'Nilanga', 'UranIslampur', 'Amalner', 'Shegaon', 'Virar', 'Phaltan'],
    'Manipur': ['Imphal', 'Bishnupur', 'Thoubal', 'Churachandpur', 'Kakching', 'Senapati', 'Ukhrul', 'Jiribam', 'Lilong', 'Wangjing', 'Kumbi', 'MayangImphal', 'Kangpokpi', 'Yairipok', 'Sugnu', 'Nambol', 'Sekmai', 'HaobamMarak', 'ThongkhongLaxmi', 'Pherzawl', 'Saikot', 'Tamenglong', 'Noney', 'Lamsang', 'MaoMaram'],
     'Meghalaya': ['Shillong', 'Tura', 'Nongstoin', 'Jowai', 'Baghmara', 'Resubelpara', 'Mankachar', 'Nongpoh', 'Williamnagar', 'Khliehriat', 'Mawkyrwat', 'Nongstoin', 'Phulbari', 'Mendipathar', 'Nongpoh', 'Nongstoin', 'Resubelpara', 'Tura', 'Umling', 'Shillong', 'Nongpoh', 'Mawthengkut', 'Khliehriat', 'Jowai', 'Mendipathar', 'Tura', 'Nongstoin', 'Nongpoh', 'Baghmara', 'Resubelpara', 'Williamnagar', 'Mawkyrwat', 'Khliehriat', 'Nongstoin', 'Phulbari', 'Mendipathar', 'Nongpoh', 'Nongstoin', 'Resubelpara', 'Tura', 'Umling', 'Shillong', 'Nongpoh', 'Mawthengkut', 'Khliehriat', 'Jowai', 'Mendipathar'],
  
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Mamit', 'Khawzawl', 'Saitual', 'Demagiri', 'Khawhai', 'Darlawn', 'Keifang', 'Vairengte', 'Kawrthah', 'Lengpui', 'Darzo', 'Phuldungsei', 'Tualbung', 'Neihdawn', 'Sapta', 'Zawlnuam', 'Phullen', 'Zawlnuam', 'Tualbung', 'Hnahthial', 'Zawlnuam', 'Phullen', 'Champhai', 'Demagiri', 'Darlawn', 'Keifang', 'Tualbung', 'Khawzawl', 'Vairengte', 'Lawngtlai', 'Serchhip', 'Kolasib', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Phuldungsei', 'Darzo', 'Keitum', 'Neihdawn', 'Sapta', 'Hnahthial'],
    
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Peren', 'Kiphire', 'Mon', 'Phek', 'Longleng', 'Zunheboto', 'Kohima', 'Tuensang', 'Mokokchung', 'Wokha', 'Phek', 'Dimapur', 'Kiphire', 'Longleng', 'Mon', 'Peren', 'Noklak', 'Khonoma', 'Tseminyu', 'Chumukedima', 'Aghunato', 'Shamator', 'Pfutsero', 'Pughoboto', 'Changtongya', 'Chumukedima', 'Dimapur', 'Jalukie', 'Medziphema', 'Noklak', 'Pfutsero', 'Aghunato', 'Changtongya', 'Shamator', 'Khonoma', 'Tseminyu', 'Pughoboto', 'Phek', 'Mon', 'Longleng', 'Kiphire', 'Peren', 'Zunheboto', 'Wokha'],
  
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore', 'Bargarh', 'Baripada', 'Jeypore', 'Bhadrak', 'Rayagada', 'Jharsuguda', 'Anugul', 'Bhawanipatna', 'Dhenkanal', 'Kendujhar', 'Paradip', 'Sunabeda', 'Sundargarh', 'Berhampur', 'Koraput', 'Kendrapara', 'Jajpur', 'Angul', 'Parlakhemundi', 'Barbil', 'Dhenkanal', 'Keonjhar', 'Jagatsinghapur', 'Nabarangpur', 'Bhadrak', 'Jharsuguda', 'Puri', 'Bhawanipatna', 'Soro', 'Rayagada', 'Rajagangapur', 'Titlagarh', 'Gunupur', 'Boudh', 'Padampur', 'Talcher', 'Athmallik', 'Byasanagar', 'Kantabanji', 'Patnagarh', 'JajpurRoad', 'Polasara', 'Banki'],
     'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Pathankot', 'Mohali', 'Hoshiarpur', 'Batala', 'Moga', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Rajpura', 'Firozpur', 'Kapurthala', 'Abohar', 'Mansa', 'Gurdaspur', 'Sangrur', 'Barnala', 'Faridkot', 'Malout', 'Fazilka', 'Rupnagar', 'Zirakpur', 'FatehgarhSahib', 'MullanpurDakha', 'Morinda', 'Pathankot', 'Nangal', 'Mukerian', 'Samana', 'Machhiwara', 'Nabha', 'Moga', 'Sunam', 'Phillaur', 'Giddarbaha', 'Qadian', 'Budhlada', 'Dhuri', 'Nawanshahr', 'Jagraon', 'Bhikhiwind', 'Mansa', 'Patti', 'SultanpurLodhi', 'Banga'],
  
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar', 'Pali', 'SriGanganagar', 'Jhunjhunu', 'Kota', 'Nagaur', 'Banswara', 'Hanumangarh', 'Dhaulpur', 'Chittorgarh', 'Sikar', 'Tonk', 'Rajsamand', 'Barmer', 'Bhilwara', 'Dungarpur', 'Jaisalmer', 'Churu', 'Kishangarh', 'Sikar', 'Tonk', 'Phalodi', 'Jhalawar', 'Ladnun', 'Fatehpur', 'Nimbahera', 'Rajsamand', 'NeemKaThana', 'Rawatbhata', 'Kekri', 'Pindwara', 'Sadri', 'Sirohi', 'Pali', 'Beawar', 'Udaipurwati', 'Losal', 'Sujangarh', 'Sheoganj', 'Sardarshahar', 'Rajakhera'],
     'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Rangpo', 'Mangan', 'Rabdentse', 'Soreng', 'Rinchenpong', 'Singtam', 'Jorethang', 'Lachen', 'Majitar', 'Melli', 'Nanga', 'Okhrey', 'Padamchen', 'Pakyong', 'Phodong', 'Phensang', 'Ralong', 'Rangpo', 'Rhenak', 'Samdong', 'Singhik', 'SombariBazar', 'Soreng', 'Sribadam', 'Sungyodhonga', 'Tashiding', 'Temi', 'Tendong', 'Tolung', 'Tsomgo', 'UpperTadong', 'Yangang', 'Zaluk', 'Yuksom', 'Yumthang', 'Zemu', 'Zuluk', 'Chungthang', 'Dzongu', 'Gyalzing', 'HeeGyathang', 'Kabi', 'KabiLungchok', 'Kewzing', 'Khangchendzonga', 'Kitam', 'Lachen', 'Lachung', 'Ley'],
  
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Tirunelveli', 'Tiruvallur', 'Tiruvannamalai', 'Krishnagiri', 'Kanchipuram', 'Ramanathapuram', 'Cuddalore', 'Karur', 'Namakkal', 'Sivakasi', 'Nagercoil', 'Tambaram', 'Mettupalayam', 'Pollachi', 'Neyveli', 'Nagapattinam', 'Tindivanam', 'Perambalur', 'Tirupathur', 'Karaikudi', 'Ambattur', 'Mayiladuthurai', 'Sirkazhi', 'Viluppuram', 'Arakkonam', 'Rasipuram', 'Avadi', 'Nandivaram-Guduvancheri', 'Kumbakonam', 'Nellikuppam', 'Thiruvarur', 'Rajapalayam', 'Virudhachalam', 'Aruppukkottai', 'Dharmapuri', 'Pudukkottai'],
  
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Jagtial', 'Mettur', 'Bhadrachalam', 'Siddipet', 'Kothagudem', 'Wanaparthy', 'Mancherial', 'Sircilla', 'Narayanpet', 'Kamareddy', 'Bodhan', 'Kothur', 'Sangareddy', 'Malkajgiri', 'Shadnagar', 'Jangaon', 'Kodad', 'Vikarabad', 'Nirmal', 'Palwancha', 'Yellandu', 'Koratla', 'Banswada', 'Narayanakhed', 'Ramagiri', 'Jangaon', 'Kodad', 'Vikarabad', 'Nirmal', 'Palwancha', 'Yellandu', 'Koratla', 'Banswada', 'Narayanakhed', 'Ramagiri', 'Gadwal', 'Makthal', 'Zahirabad', 'SirpurKagaznagar'],
  
    'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur', 'Belonia', 'Kailasahar', 'Khowai', 'Ambassa', 'Sonamura', 'Kamalpur', 'Santirbazar', 'Sabroom', 'Amarpur', 'Teliamura', 'Kumarghat', 'Jogendranagar', 'Ranirbazar', 'Radhakishorepur', 'Dharmanagar', 'Udaipur', 'Kailasahar', 'Khowai', 'Ambassa', 'Sonamura', 'Kamalpur', 'Santirbazar', 'Sabroom', 'Amarpur', 'Teliamura', 'Kumarghat', 'Jogendranagar', 'Ranirbazar', 'Radhakishorepur', 'Jampuijala', 'Mohanpur', 'Bishalgarh', 'Satchand', 'Kashyampur', 'Pananagar', 'Amarpur', 'Tepania', 'Radhakishorepur', 'Tulashikhar', 'Kathalia', 'Satchand', 'Bhagabandh', 'Khayerpur', 'Dhajanagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Meerut', 'Varanasi', 'Prayagraj', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Noida', 'Firozabad', 'Loni', 'Jhansi', 'Muzaffarnagar', 'Mathura', 'Shahjahanpur', 'Rampur', 'Farrukhabad', 'Ayodhya', 'Bulandshahr', 'Etawah', 'Hapur', 'Mirzapur', 'Bijnor', 'Amroha', 'Hardoi', 'Bahraich', 'Jaunpur', 'Unnao', 'Sitapur', 'Sultanpur', 'Ghazipur', 'Fatehpur', 'RaeBareli', 'Azamgarh', 'Banda', 'Naini', 'Hathras', 'Shikohabad', 'Obra', 'Lakhimpur', 'Sambhal', 'Pilibhit', 'Etah', 'Tanda', 'Nawabganj', 'Mughalsarai', 'Bagpat'],
  
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kathgodam', 'Srinagar', 'Pithoragarh', 'Ramnagar', 'Roorkee', 'Jaspur', 'Bazpur', 'Khatima', 'Bageshwar', 'Kichha', 'Manglaur', 'Sitarganj', 'Jhabrera', 'Kashipur', 'Barkot', 'Mussoorie', 'Pauri', 'Nagla', 'Munsiari', 'Dharchula', 'Jhinkanali', 'Bhowali', 'Rudraprayag', 'Devprayag', 'Pithoragarh', 'Ranikhet', 'Kotdwar', 'Roorkee', 'Lansdowne', 'Dineshpur', 'Kichha', 'Ramnagar', 'Khatima', 'Kashipur', 'Barkot', 'Gopeshwar', 'Champawat', 'Lohaghat', 'Jaspur', 'Almora', 'Jhabrera', 'Kedarnath'],
     'West Bengal': ['Kolkata', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni', 'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Bangaon', 'Bally', 'Santipur', 'Raghunathganj', 'Contai', 'Gangarampur', 'Jangipur', 'Kaliaganj', 'Chakdaha', 'EnglishBazar', 'Murshidabad', 'Memari', 'Habra', 'Taki', 'Gushkara', 'Arambagh', 'Nalhati', 'Kalimpong', 'JaynagarMajilpur', 'Bahula', 'Domjur', 'UttarDinajpur', 'Panchla', 'Khardaha', 'Rampurhat', 'Tamluk', 'Balurghat', 'Suri', 'Jalpaiguri', 'Basirhat', 'Madhyamgram', 'Joypur'],
  
    'Andaman and Nicobar Islands': ['Port Blair', 'Bombooflat', 'CarNicobar', 'Garacharma', 'CampbellBay', 'Mayabunder', 'Diglipur', 'Rangat', 'Betapur', 'Prothrapur', 'Kalpetta', 'Guptapara', 'Ferrargunj', 'Nancowry', 'LittleAndaman', 'HutBay', 'NeilIsland', 'Kamorta', 'LongIsland', 'SmithIsland', 'NorthPassageIsland', 'Carnicobar', 'CampbellBay', 'Mayabunder', 'Diglipur', 'Rangat', 'Betapur', 'Prothrapur', 'Kalpetta', 'Guptapara', 'Ferrargunj', 'Nancowry', 'LittleAndaman', 'HutBay', 'NeilIsland', 'Kamorta', 'LongIsland', 'SmithIsland', 'NorthPassageIsland', 'Chouldari', 'Teressa', 'Bambooflat', 'CampbellBay', 'Katchal', 'KadmatIsland', 'CarNicobar', 'Malacca', 'TenDegreeChannel', 'Nicobar'],
  
    'Chandigarh': ['Chandigarh'],
  
    'Dadra and Nagar Haveli and Daman and Diu': ['Silvassa', 'Daman', 'Diu'],
  
    'Delhi': ['New Delhi', 'Delhi'],
  
    'Lakshadweep': ['Kavaratti'],
  
    'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
  };
  

  const [formData, setFormData] = useState({
    userId: '',
    parentName: '',
    password: '',
    mobileNumber: '',
    childUserId: '',
    address: {
      city: '',
      state: '',
      pincode: '',
    },
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        state: stateValue,
      },
    }));
    setSelectedState(stateValue);
  };
  
  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        city: cityValue,
      },
    }));
    setSelectedCity(cityValue);
  };
  
  

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };






  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'parentName' && value.length > 40) {
      return; // Ignore input if it exceeds 40 characters
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };




  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };



const handleSubmit = (e) => {
  e.preventDefault();
  // Perform form submission logic, e.g., send data to server
  axios
    .post('http://127.0.0.1:5000/parent/parentregister', formData)
    .then((response) => {
      if (response.data.error) {
        // Display the error message
        alert(response.data.error);
      } else {
        console.log('Success:', response.data);
        alert(`Registration Successful`);
        root.render(
          <React.StrictMode>
            <ParentLogin/>
          </React.StrictMode>
        );
        // Redirect to a success page or perform other actions as needed
      }
    })
    .catch((error) => {
      // console.error('Error:', error);
      alert(`Student Not Found  Or Already Registered`);
      // Handle errors that occurred during the request
    });
};




const handlelogin=()=>{
  root.render(
    <React.StrictMode>
      <ParentLogin/>
    </React.StrictMode>
  );
}

const handlehome=()=>{
  root.render(
    <Router>
    <Home />
  </Router>
  );
}






  return (
    <div className="container" style={{ backgroundColor: 'lightgreen',color:"whitesmoke" ,marginTop: '6px'}}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Parent Registration Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            placeholder="Enter Unique UserId"
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentName">Parent Name:</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            placeholder="Enter Your Name"
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group"> 
<label htmlFor="password">Password:<span style={{"fontSize":"13px"}}> (At least one uppercase,one lowercase,one special symbol,and max characters are 8)</span></label>
    <div className="password-input-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={formData.password}
        placeholder="Enter Your Password"
        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
        onChange={handleInputChange}
        className="form-control"
        required
      />
      <span className="password-toggle-icon" onClick={handleTogglePassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
      </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            placeholder="Enter Your Mobile No."
            onChange={handleInputChange}
            maxLength={13}
            minLength={10}
            pattern="^[+6-9][0-9]*$"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="childUserId">Child User ID:</label>
          <input
            type="text"
            id="childUserId"
            name="childUserId"
            value={formData.childUserId}
            placeholder="Enter Your Child UserId"
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
           <label htmlFor="state">State:</label>
          
           <select
  id="state"
  name="state"
  value={selectedState}
  onChange={handleStateChange}
  className="form-control"
  required
>
             <option value="" disabled>Select State</option>
            
             {Object.keys(stateCities).map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
           </select>
           </div>
           <div className="form-group">
    <label htmlFor="city">City:</label>
 

<select
  id="city"
  name="city"
  value={selectedCity}
  onChange={handleCityChange}
  className="form-control"
  required
>
      <option value="" disabled>Select City</option>
      {stateCities[selectedState] &&
    stateCities[selectedState].map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
    </select>
  </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.address.pincode}
            placeholder="Enter Six Digits Pincode"
            onChange={handleAddressChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success" onClick={handlelogin}>
            Log In
          </button>
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={handlehome}>
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentRegistration;
