
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import StudentLogin from './StudentLogin';
import Home from './Home.js';
import './StudentRegistration.css';
import './eye.css';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const StudentRegistration = () => {

  const [documentFile, setDocumentFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const root = ReactDOM.createRoot(document.getElementById('root'));

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

  const subjectOptions = {
    BSc: {
      'Physics': ['Classical Mechanics', 'Electromagnetism', 'Quantum Mechanics','Mathematics','Thermodynamics','Statistical Mechanics','Optics','Atomic and Molecular Physics','Nuclear Physics','Solid State Physics','Astrophysics','Mathematical Methods in Physics','Computational Physics','Experimental Physics','Electronics and Instrumentation','Mathematical Physics','Particle Physics','Cosmology','Condensed Matter Physics','Laser Physics'],

      'Chemistry': [
        'Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry',
        'Biochemistry', 'Environmental Chemistry', 'Polymer Chemistry', 'Industrial Chemistry',
        'Quantum Chemistry', 'Spectroscopy', 'Thermodynamics', 'Chemical Kinetics',
        'Coordination Chemistry', 'Computational Chemistry', 'Medicinal Chemistry',
        'Forensic Chemistry', 'Nanotechnology', 'Surface Chemistry', 'Solid State Chemistry',
        'Supramolecular Chemistry'
    ],

    'Mathematics': [
      'Calculus', 'Linear Algebra', 'Differential Equations', 'Real Analysis', 'Complex Analysis',
      'Abstract Algebra', 'Number Theory', 'Topology', 'Probability Theory', 'Statistics',
      'Numerical Analysis', 'Mathematical Modeling', 'Discrete Mathematics', 'Graph Theory',
      'Mathematical Logic', 'Mathematical Methods', 'Mathematical Physics', 'Operations Research',
      'Game Theory', 'Optimization', 'Mathematical Finance', 'Partial Differential Equations',
      'Functional Analysis', 'Algebraic Geometry', 'Combinatorics', 'Number Theory',
      'Mathematical Statistics', 'Geometry', 'Coding Theory', 'Control Theory', 'Mathematical Biology',
      'Computational Mathematics', 'Measure Theory', 'Fourier Analysis', 'Mathematical Economics',
      'Stochastic Processes', 'Mathematical Logic', 'Mathematical Cryptography', 'Mathematical Education',
      'Mathematical Psychology', 'Mathematical Linguistics', 'Mathematical Music Theory',
      'Mathematical Sociology', 'Mathematical Ethnomusicology', 'Mathematical Art',
      'Mathematical Philosophy', 'Mathematical History', 'Mathematical Literature'
  ],

  'Biology': [
    'Cell Biology', 'Genetics', 'Ecology', 'Evolutionary Biology', 'Microbiology',
    'Biochemistry', 'Plant Biology', 'Animal Biology', 'Molecular Biology',
    'Physiology', 'Biotechnology', 'Immunology', 'Biostatistics', 'Bioinformatics',
    'Developmental Biology', 'Neurobiology', 'Environmental Science', 'Zoology',
    'Botany', 'Marine Biology', 'Conservation Biology', 'Human Anatomy', 'Biophysics',
    'Entomology', 'Parasitology', 'Pharmacology', 'Endocrinology', 'Genomics',
    'Population Biology', 'Virology', 'Microbial Ecology', 'Paleontology',
    'Mycology', 'Ornithology', 'Herpetology', 'Horticulture', 'Ecotoxicology',
    'Plant Pathology', 'Biomedical Sciences', 'Toxicology', 'Bioethics',
    'Cancer Biology', 'Biological Anthropology', 'Aquatic Biology', 'Ecological Genetics',
    'Forensic Biology', 'Reproductive Biology', 'Systems Biology'
],
      // Add more branches and their respective subjects as needed
    },

    'BTech': {
      'Computer Science': [
          'Data Structures', 'Algorithms', 'Database Management',
          'Operating Systems', 'Computer Networks', 'Software Engineering',
          'Artificial Intelligence', 'Machine Learning', 'Computer Architecture',
          'Web Development', 'Mobile App Development', 'Cybersecurity'
      ],
      'Electronics': [
          'Digital Electronics', 'Analog Circuits', 'Communication Systems',
          'Microprocessors', 'VLSI Design', 'Embedded Systems',
          'Signal Processing', 'Control Systems', 'Robotics',
          'Wireless Communication', 'Optoelectronics', 'Electronic Instrumentation'
      ],
      'Mechanical': [
          'Thermodynamics', 'Fluid Mechanics', 'Mechanical Design',
          'Heat Transfer', 'Materials Science', 'Automotive Engineering',
          'Manufacturing Processes', 'Engineering Mechanics', 'Robotics',
          'Mechatronics', 'Renewable Energy', 'Aerodynamics'
      ],
      'Civil': [
          'Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering',
          'Hydraulics', 'Construction Management', 'Environmental Engineering',
          'Surveying', 'Concrete Technology', 'Geomatics',
          'Structural Design', 'Urban Planning', 'Water Resources Engineering'
      ],
      'Electrical': [
          'Power Systems', 'Control Systems', 'Electrical Machines',
          'Electromagnetic Field Theory', 'Digital Signal Processing', 'Power Electronics',
          'Renewable Energy Systems', 'Microcontrollers', 'Instrumentation',
          'High Voltage Engineering', 'Electric Drives', 'Smart Grids'
      ],
      // Add more branches and their respective subjects as needed
    },
    BA: {
      'English': [
        'English Literature',
        'Creative Writing',
        'Linguistics',
        'American Literature',
        'Shakespearean Studies',
        'Contemporary Poetry'
        ],
        'History': [
        'Ancient History',
        'Modern History',
        'World History',
        'Medieval History',
        'European History',
        'History of Science'
        ],
        'Political Science': [
        'Political Theory',
        'International Relations',
        'Comparative Politics',
        'Public Administration',
        'Political Sociology',
        'Global Governance'
        ],
        'Economics': [
        'Microeconomics',
        'Macroeconomics',
        'International Economics',
        'Development Economics',
        'Game Theory',
        'Financial Economics'
        ],
        'Psychology': [
        'General Psychology',
        'Cognitive Psychology',
        'Developmental Psychology',
        'Social Psychology',
        'Abnormal Psychology',
        'Health Psychology'
        ],
        'Sociology': [
        'Introduction to Sociology',
        'Social Theory',
        'Research Methods in Sociology',
        'Criminology',
        'Gender Studies',
        'Environmental Sociology'
        ],
        'Anthropology': [
        'Cultural Anthropology',
        'Archaeology',
        'Biological Anthropology',
        'Ethnographic Methods',
        'Anthropology of Religion',
        'Medical Anthropology'
        ],
      // Add more branches and their respective subjects as needed
    },
    BCom: {
      'Accounting': [
        'Financial Accounting',
        'Management Accounting',
        'Cost Accounting',
        'Auditing',
        'Taxation',
        'Advanced Financial Reporting'
        ],
        'Finance': [
        'Investment Analysis',
        'Financial Markets',
        'Corporate Finance',
        'Derivatives and Risk Management',
        'International Finance',
        'Financial Modeling'
        ],
        'Marketing': [
        'Consumer Behavior',
        'Marketing Research',
        'Digital Marketing',
        'Advertising and Promotion',
        'Brand Management',
        'Sales Management'
        ],
        'Management': [
        'Organizational Behavior',
        'Human Resource Management',
        'Strategic Management',
        'Operations Management',
        'Entrepreneurship',
        'Business Ethics and Corporate Governance'
        ],
        'Economics': [
        'Microeconomics',
        'Macroeconomics',
        'Managerial Economics',
        'Econometrics',
        'International Trade',
        'Development Economics'
        ],
        'Business Law': [
        'Contract Law',
        'Corporate Law',
        'Intellectual Property Law',
        'Employment Law',
        'International Business Law',
        'Legal and Ethical Issues in Business'
        ],
        'Statistics': [
        'Business Statistics',
        'Quantitative Methods',
        'Data Analysis and Visualization',
        'Probability Theory',
        'Regression Analysis',
        'Operations Research'
        ],
      // Add more branches and their respective subjects as needed
    },
    BBA: {
      'Business Administration': [
        'Business Communication',
        'Business Ethics',
        'Entrepreneurship',
        'Business Law',
        'Financial Management',
        'Marketing Management'
        ],
        'Entrepreneurship': [
          'Startup Management',
          'Innovation Strategies',
          'Small Business Finance',
          'New Venture Creation',
          'Entrepreneurial Marketing',
          'Social Entrepreneurship'
          ],
          'Human Resource Management': [
            'Employee Relations',
            'Training and Development',
            'Performance Management',
            'Compensation Management',
            'Organizational Development',
            'Labor Law'
            ],
            'Operations Management': [
              'Supply Chain Management',
              'Quality Management',
              'Project Management',
              'Operations Research',
              'Logistics Management',
              'Production Planning and Control'
              ],
      // Add more branches and their respective subjects as needed
    },
    BCA: {
      'Computer Applications': [
        'Programming in Java',
        'Web Development',
        'Database Systems',
        'Data Structures',
        'Computer Networks',
        'Operating Systems'
        ],
        'Information Technology': [
        'Information Security',
        'Networking',
        'Cloud Computing',
        'Mobile Application Development',
        'Web Design and Development',
        'Cybersecurity'
        ],
        'Software Development': [
        'Software Engineering',
        'Mobile App Development',
        'Agile Development',
        'Artificial Intelligence',
        'Machine Learning',
        'Software Testing and Quality Assurance'
        ],
        'Data Science': [
        'Data Analytics',
        'Data Mining',
        'Big Data Technologies',
        'Statistical Analysis',
        'Machine Learning',
        'Data Visualization'
        ]
      // Add more branches and their respective subjects as needed
    },
    BArch: {
      'Architecture Design': [
        'Architectural Drawing',
        'Building Construction',
        'Architectural Theory',
        'Urban Design',
        'Environmental Design',
        'Sustainable Architecture'
        ],
        'Construction Management': [
        'Project Planning',
        'Construction Safety',
        'Cost Estimation',
        'Contract Administration',
        'Construction Law',
        'Risk Management in Construction'
        ],
        'Urban Planning': [
        'Urban Design',
        'Transport Planning',
        'Sustainable Development',
        'Land Use Planning',
        'Urban Economics',
        'GIS and Remote Sensing for Urban Planning'
        ],
        'Interior Design': [
        'Space Planning',
        'Materials and Finishes',
        'Lighting Design',
        'Furniture Design',
        'Color Theory',
        'Commercial Interior Design'
        ],
      // Add more branches and their respective subjects as needed
    },
    MBBS: {
      'Medicine': [
        'Anatomy',
        'Physiology',
        'Pathology',
        'Pharmacology',
        'Microbiology',
        'Internal Medicine'
        ],
        'Surgery': [
        'General Surgery',
        'Orthopedic Surgery',
        'Plastic Surgery',
        'Cardiothoracic Surgery',
        'Neurosurgery',
        'Pediatric Surgery'
        ],
        'Pediatrics': [
        'Neonatology',
        'Pediatric Cardiology',
        'Pediatric Neurology',
        'Developmental Pediatrics',
        'Pediatric Endocrinology',
        'Pediatric Gastroenterology'
        ],
        'Obstetrics and Gynecology': [
        'Obstetrics',
        'Gynecology',
        'Reproductive Medicine',
        'Maternal-Fetal Medicine',
        'Gynecologic Oncology',
        'Infertility and Assisted Reproductive Techniques'
        ],
      // Add more branches and their respective subjects as needed
    },
    LLB: {
      'Civil Law': [
        'Indian Legal System',
        'Constitutional Law',
        'Property Law',
        'Administrative Law',
        'Environmental Law',
        'Land Laws'
        ],
        'Criminal Law': [
        'Criminal Procedure Code',
        'Indian Penal Code',
        'Evidence Law',
        'Criminal Law Amendment Acts',
        'Cyber Law',
        'Juvenile Justice System'
        ],
        'Corporate Law': [
        'Company Law',
        'Securities Law',
        'Intellectual Property Law',
        'Competition Law',
        'Banking and Insurance Law',
        'Mergers and Acquisitions'
        ],
        'International Law': [
        'International Human Rights Law',
        'International Criminal Law',
        'International Trade Law',
        'International Environmental Law',
        'International Humanitarian Law',
        'Law of the Sea'
        ],
      // Add more branches and their respective subjects as needed
    },
    BDS: {
      'Dentistry': [
        'Oral Anatomy',
        'Orthodontics',
        'Periodontics',
        'Endodontics',
        'Oral Pathology',
        'Pediatric Dentistry'
        ],
        'Oral and Maxillofacial Surgery': [
        'Oral Surgery',
        'Maxillofacial Trauma',
        'Dental Implants',
        'Orthognathic Surgery',
        'Temporomandibular Joint Disorders',
        'Facial Esthetics and Reconstructive Surgery'
        ],
        'Orthodontics': [
        'Orthodontic Diagnosis',
        'Orthodontic Appliances',
        'Craniofacial Orthopedics',
        'Functional Orthodontics',
        'Clear Aligner Therapy',
        'Surgical Orthodontics'
        ],
        'Periodontics': [
        'Periodontal Anatomy',
        'Periodontal Diseases',
        'Periodontal Surgery',
        'Gingival and Osseous Surgery',
        'Periodontal Regenerative Techniques',
        'Implant Dentistry'
        ],
      // Add more branches and their respective subjects as needed
    },
    BPharm: {
      'Pharmacy Practice': [
        'Pharmacotherapy',
        'Pharmacovigilance',
        'Clinical Pharmacy',
        'Community Pharmacy',
        'Hospital Pharmacy',
        'Pharmaceutical Care'
        ],
        'Pharmaceutical Chemistry': [
        'Medicinal Chemistry',
        'Pharmaceutical Analysis',
        'Drug Design',
        'Pharmaceutical Organic Chemistry',
        'Pharmaceutical Inorganic Chemistry',
        'Pharmaceutical Physical Chemistry'
        ],
        'Pharmacology': [
        'Pharmacokinetics',
        'Pharmacodynamics',
        'Toxicology',
        'Pharmacogenomics',
        'Clinical Pharmacology',
        'Pharmacoepidemiology'
        ],
        'Pharmacognosy': [
        'Plant Drug Analysis',
        'Herbal Medicines',
        'Phytochemistry',
        'Ethnopharmacology',
        'Ayurvedic and Traditional Medicines',
        'Industrial Pharmacognosy'
        ],
      // Add more branches and their respective subjects as needed
    },
    BAMS: {
      'Ayurvedic Medicine': [
        'Basic Principles of Ayurveda',
        'Ayurvedic Pharmacology',
        'Panchakarma',
        'Rasayana and Vajikarana',
        'Nadi Vigyan (Pulse Diagnosis)',
        'Research Methodology in Ayurveda'
        ],
        'Panchakarma': [
        'Vamana',
        'Virechana',
        'Basti',
        'Nasya',
        'Raktamokshana',
        'Panchakarma Techniques'
        ],
        'Kaya Chikitsa': [
        'Rasayana Chikitsa',
        'Vajikarana Chikitsa',
        'Twak Chikitsa',
        'Rakta Mokshana',
        'Kshara Sutra',
        'Sutrasthana'
        ],
        'Shalya Tantra': [
        'Kshara Sutra',
        'Agneya Chikitsa',
        'Shalakya Tantra',
        'Shalya Tantra Techniques',
        'Parasurgical Techniques',
        'Surgical Instruments in Ayurveda'
        ],
      // Add more branches and their respective subjects as needed
    },
    BHMS: {
      'Homeopathic Medicine': [
        'Homeopathic Materia Medica',
        'Organon of Medicine',
        'Case Taking',
        'Homeopathic Pharmacy',
        'Repertory',
        'Homeopathic Therapeutics'
        ],
        'Materia Medica': [
        'Drug Provings',
        'Therapeutic Applications',
        'Drug Relationships',
        'Clinical Materia Medica',
        'Comparative Materia Medica',
        'Toxicology and Forensic Pharmacy'
        ],
        'Organon of Medicine': [
        'Principles of Homeopathy',
        'Case Management',
        'Repertory',
        'History of Medicine',
        'Philosophy of Homeopathy',
        'Miasmatic Prescribing'
        ],
        'Repertory': [
        'Repertory Analysis',
        'Repertorization Techniques',
        'Repertory Software',
        `Boger Boenninghausen's Repertory`,
        `Kent's Repertory`,
        'Synthesis Repertory'
        ],
      // Add more branches and their respective subjects as needed
    },
    BPT: {
      'Physiotherapy': [
        'Human Anatomy',
        'Physiotherapy Techniques',
        'Rehabilitation',
        'Kinesiology',
        'Electrotherapy',
        'Biomechanics'
        ],
        'Orthopedics': [
        'Orthopedic Assessment',
        'Manual Therapy',
        'Sports Physiotherapy',
        'Musculoskeletal Physiotherapy',
        'Spine Rehabilitation',
        'Hand Rehabilitation'
        ],
        'Neurology': [
        'Neurological Assessment',
        'Neuromuscular Rehabilitation',
        'Stroke Rehabilitation',
        'Neurophysiology',
        'Neurodevelopmental Therapy',
        'Balance and Vestibular Rehabilitation'
        ],
        'Cardiopulmonary': [
        'Cardiovascular Physiotherapy',
        'Pulmonary Rehabilitation',
        'Cardiac Rehabilitation',
        'Cardiopulmonary Assessment',
        'Electrocardiography',
        'Exercise Physiology'
        ],
      // Add more branches and their respective subjects as needed
    },
    'B.Ed': {
      'Elementary Education': [
        'Child Psychology',
        'Teaching Methods',
        'Educational Technology',
        'Educational Psychology',
        'Pedagogy',
        'Assessment and Evaluation'
        ],
        'Special Education': [
        'Inclusive Education',
        'Learning Disabilities',
        'Behavior Management',
        'Assistive Technology',
        'Individualized Education Program (IEP)',
        'Educational Policies and Practices for Special Needs'
        ],
        'Educational Psychology': [
        'Cognitive Development',
        'Motivation in Education',
        'Assessment and Evaluation',
        'Educational Research',
        'Learning Theories',
        'Educational Measurement and Evaluation'
        ],
      // Add more branches and their respective subjects as needed
    },
    BFA: {
      'Fine Arts': [
        'Drawing and Sketching',
        'Painting',
        'Sculpture',
        'Art History',
        'Aesthetics',
        'Contemporary Art'
        ],
        'Applied Arts': [
          'Typography',
          'Graphic Design',
          'Advertising Design',
          'Visual Communication',
          'Packaging Design',
          'Digital Art and Design'
          ],
      'Sculpture': ['Clay Modeling', 'Casting Techniques', 'Figurative Sculpture'],
      'Painting': ['Oil Painting', 'Watercolor Painting', 'Acrylic Painting'],
      'Photography': [
        'Photographic Techniques',
        'Digital Photography',
        'Studio Lighting',
        'Photo Editing',
        'Visual Storytelling',
        'Documentary Photography'
        ],
        'Animation': [
        '2D Animation',
        '3D Animation',
        'Character Design',
        'Storyboarding',
        'Visual Effects',
        'Motion Graphics'
        ],
      // Add more branches and their respective subjects as needed
    },
    BHM: {
      'Hotel Management': [
        'Front Office Management',
        'Food Production',
        'Hotel Operations',
        'Housekeeping Management',
        'Hospitality Law and Ethics',
        'Hotel Revenue Management'
        ],
        'Hospitality Administration': [
        'Hospitality Marketing',
        'Hotel Financial Management',
        'Revenue Management',
        'Strategic Management in Hospitality',
        'Event Management',
        'Tourism and Hospitality Law'
        ],
        'Culinary Arts': [
        'Food Preparation',
        'Menu Planning',
        'Gastronomy',
        'Bakery and Pastry Arts',
        'International Cuisine',
        'Food and Beverage Cost Control'
        ],
        'Food and Beverage Service': [
        'Bar Operations',
        'Restaurant Management',
        'Beverage Management',
        'Food and Beverage Operations',
        'Wine Studies and Service',
        'Banquet and Catering Management'
        ],
      // Add more branches and their respective subjects as needed
    },
    'B.Voc': {
      'Vocational Studies': [
        'Technical Skills Development',
        'Entrepreneurship',
        'Industry Internship',
        'Professional Communication',
        'Problem-Solving Techniques',
        'Leadership and Teamwork'
        ],
        'Tourism and Hospitality': [
        'Tourism Management',
        'Event Management',
        'Hospitality Services',
        'Travel and Tourism Operations',
        'Tourism Marketing',
        'Destination Management'
        ],
        'Retail Management': [
        'Retail Operations',
        'Visual Merchandising',
        'Customer Relationship Management',
        'Retail Marketing',
        'Inventory Management',
        'E-commerce and Retail Technology'
        ],
        'Media and Entertainment': [
        'Media Production',
        'Digital Marketing',
        'Media Management',
        'Broadcast Journalism',
        'Advertising and Branding',
        'Film Studies'
        ],
      // Add more branches and their respective subjects as needed
    },
    'BBA LLB': {
      'Business Law': [
        'Business Organizations',
        'Commercial Contracts',
        'Mergers and Acquisitions',
        'Corporate Governance',
        'Banking and Insurance Law',
        'Negotiable Instruments'
        ],
        'Constitutional Law': [
        'Fundamental Rights',
        'Constitutional Amendments',
        'Judicial Review',
        'Legislative Powers and Limitations',
        'Constitutional Interpretation',
        'Public Interest Litigation'
        ],
        'Corporate Law': [
        'Company Law',
        'Securities Law',
        'Intellectual Property Law',
        'Competition Law',
        'Insolvency and Bankruptcy Law',
        'Corporate Governance and Ethics'
        ],
        'International Law': [
        'International Human Rights Law',
        'International Criminal Law',
        'International Trade Law',
        'International Organizations',
        'International Dispute Resolution',
        'Law of Treaties'
        ],
      // Add more branches and their respective subjects as needed
    },
    'B.Tech + M.Tech': {
      'Computer Science': [
        'Data Structures',
        'Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks',
        'Artificial Intelligence'
        ],
        'Electronics': [
        'Analog Electronics',
        'Digital Electronics',
        'Signal Processing',
        'Microprocessors and Microcontrollers',
        'VLSI Design',
        'Embedded Systems'
        ],
        'Mechanical': [
        'Mechanics',
        'Thermodynamics',
        'Fluid Mechanics',
        'Heat Transfer',
        'Machine Design',
        'Industrial Engineering'
        ],
        'Civil': [
        'Structural Engineering',
        'Geotechnical Engineering',
        'Transportation Engineering',
        'Environmental Engineering',
        'Construction Management',
        'Water Resources Engineering'
        ],
      // Add more branches and their respective subjects as needed
    },
    'Integrated B.Tech': {
      'Computer Science': [
        'Data Structures',
        'Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks',
        'Artificial Intelligence'
        ],
        'Electronics': [
        'Analog Electronics',
        'Digital Electronics',
        'Signal Processing',
        'Microprocessors and Microcontrollers',
        'VLSI Design',
        'Embedded Systems'
        ],
        'Mechanical': [
        'Mechanics',
        'Thermodynamics',
        'Fluid Mechanics',
        'Heat Transfer',
        'Machine Design',
        'Industrial Engineering'
        ],
        'Civil': [
        'Structural Engineering',
        'Geotechnical Engineering',
        'Transportation Engineering',
        'Environmental Engineering',
        'Construction Management',
        'Water Resources Engineering'
        ],
      // Add more branches and their respective subjects as needed
    },
    BE: {
      'Computer Engineering': [
        'Computer Networks',
        'Database Systems',
        'Software Engineering',
        'Data Structures',
        'Algorithms',
        'Operating Systems'
        ],
        'Electronics Engineering': [
        'Electronic Circuits',
        'Microprocessors',
        'Communication Systems',
        'Digital Electronics',
        'Signal Processing',
        'VLSI Design'
        ],
        'Mechanical Engineering': [
        'Mechanics of Solids',
        'Thermodynamics',
        'Manufacturing Processes',
        'Fluid Mechanics',
        'Heat Transfer',
        'Machine Design'
        ],
        'Civil Engineering': [
        'Structural Analysis',
        'Geotechnical Engineering',
        'Transportation Engineering',
        'Environmental Engineering',
        'Construction Management',
        'Surveying'
        ],
      // Add more branches and their respective subjects as needed
    },
  };

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    enrollmentNumber: '',
    mobileNumber: '',
    dob: '',
    parentsMobile: '',
    fatherName: '',
    motherName: '',
    gender: '',
    address: {
      city: '',
      state: '',
      pincode: '',
    },
    course: '',
    branch: '',
    subjects: [''],  // Initialize with an empty subject
    year: '',

  });


  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
  };







  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'course') {
      // Update the selected course
      const selectedCourse = value;
      setFormData((prevData) => ({ ...prevData, course: selectedCourse }));

      // Reset the branch and subject values
      setFormData((prevData) => ({ ...prevData, branch: '', subject: '' }));
    }

    if (name === 'branch') {
      // Update the selected branch
      const selectedBranch = value;
      setFormData((prevData) => ({ ...prevData, branch: selectedBranch }));

      // Reset the subject value
      setFormData((prevData) => ({ ...prevData, subject: '' }));
    }

    if (name === 'subject') {
      // Update the selected subject
      const selectedSubject = value;
      setFormData((prevData) => ({ ...prevData, subject: selectedSubject }));


    }
  };


  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'dob') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
  
      if (selectedDate > minDate) {
        
        alert("You must be at least 13 years old.");
        return; // Ignore further processing
      }
    } 
    else if (name === 'name' && value.length > 40) {
      return; // Ignore input if it exceeds 40 characters
    }
    else if (name === 'fatherName' && value.length > 40) {
      return; // Ignore input if it exceeds 40 characters
    }
    else if (name === 'motherName' && value.length > 40) {
      return; // Ignore input if it exceeds 40 characters
    }
  
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  
  // Define the branch options for each course
  const branchOptions = {
    BSc: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    BTech: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'],
    BA: ['English', 'History', 'Political Science', 'Economics','Psychology','Sociology','Anthropology'],
    BCom: ['Accounting', 'Finance', 'Marketing', 'Management','Economics','Business Law','Statistics'],
    BBA: ['Business Administration', 'Entrepreneurship', 'Human Resource Management','Operations Management'],
    BCA: ['Computer Applications', 'Information Technology', 'Software Development','Data Science'],
    BArch: ['Architecture Design', 'Construction Management', 'Urban Planning','Interior Design'],
    MBBS: ['Medicine', 'Surgery', 'Pediatrics', 'Obstetrics and Gynecology'],
    LLB: ['Civil Law', 'Criminal Law', 'Corporate Law', 'International Law'],
    BDS: ['Dentistry', 'Oral and Maxillofacial Surgery', 'Orthodontics', 'Periodontics'],
    BPharm: ['Pharmacy Practice', 'Pharmaceutical Chemistry', 'Pharmacology', 'Pharmacognosy'],
    BAMS: ['Ayurvedic Medicine', 'Panchakarma', 'Kaya Chikitsa', 'Shalya Tantra'],
    BHMS: ['Homeopathic Medicine', 'Materia Medica', 'Organon of Medicine', 'Repertory'],
    BPT: ['Physiotherapy', 'Orthopedics', 'Neurology', 'Cardiopulmonary'],
    'B.Ed': ['Elementary Education', 'Special Education', 'Educational Psychology'],
    BFA: ['Fine Arts', 'Applied Arts', 'Sculpture', 'Painting','Animation','Photography'],
    BHM: ['Hotel Management', 'Hospitality Administration', 'Culinary Arts', 'Food and Beverage Service'],
    'B.Voc': ['Vocational Studies', 'Tourism and Hospitality', 'Retail Management', 'Media and Entertainment'],
    'BBA LLB': ['Business Law', 'Constitutional Law', 'Corporate Law', 'International Law'],
    'B.Tech + M.Tech': ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
    'Integrated B.Tech': ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
    BE: ['Computer Engineering', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  };

  // Get the branch options based on the selected course
  const selectedBranchOptions = branchOptions[formData.course] || [];


  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData((prevData) => ({ ...prevData, course: selectedCourse }));
  };

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setFormData((prevData) => ({ ...prevData, branch: selectedBranch }));
  };




  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };



  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
    setDocumentPreview(URL.createObjectURL(file));
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };


  const handleSubjectChange = (e, index) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({ ...prevData, subjects: newSubjects }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();


    // Create FormData object and append form data
    const formDataObj = new FormData();
    formDataObj.append('userId', formData.userId);
    formDataObj.append('password', formData.password);
    formDataObj.append('name', formData.name);
    formDataObj.append('enrollmentNumber', formData.enrollmentNumber);
    formDataObj.append('mobileNumber', formData.mobileNumber);
    formDataObj.append('dob', formData.dob);
    formDataObj.append('parentsMobile', formData.parentsMobile);
    formDataObj.append('fatherName', formData.fatherName);
    formDataObj.append('motherName', formData.motherName);
    formDataObj.append('gender', formData.gender);

    formDataObj.append('city', selectedCity); // Include selected city
    formDataObj.append('state', selectedState);
    formDataObj.append('pincode', formData.address.pincode);

    formDataObj.append('course', formData.course);
    formDataObj.append('branch', formData.branch);


    formDataObj.append('subjects', formData.subjects);

    formDataObj.append('year', formData.year);
    formDataObj.append('documentFile', documentFile); // Append document file
    formDataObj.append('photoFile', photoFile); // Append photo file

    // Send the form data to the backend

    axios
      .post('http://127.0.0.1:5000/student/studentregister', formDataObj)
      .then((response) => {



        console.log('Success:', response.data);
        if (response.data.message === 'Student already registered') {
          alert('Student Already Registered');
        } else {
          alert('Registration Successful');
          root.render(
            <React.StrictMode>
              <StudentLogin />
            </React.StrictMode>
          );
        }
        // Redirect to a success page or perform other actions as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors that occurred during the request
      });

  };



  const handlelogin = () => {
    root.render(
      <React.StrictMode>
        <StudentLogin />
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
    <div className="container" style={{ backgroundColor: 'lightblue' }}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Student Registration Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
           
            value={formData.userId}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Unique UserId"
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
              onChange={handleChange}
              placeholder="Enter Password"
              className="form-control"
             
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              required
            />

            <span className="password-toggle-icon" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br></br>


          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="enrollmentNumber">Enrollment Number:</label>
            <input
              type="number"
              id="enrollmentNumber"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              placeholder="Enter Your Enrollment No."
              className="form-control"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              //  onChange={handleInputChange}
              onChange={handleCourseChange}
              className="form-control"
              required
            >
              <option value="" disabled>Select Course</option>
              <option value="BSc">BSc</option>
              <option value="BTech">BTech</option>
              <option value="BA">BA</option>
              <option value="BCom">BCom</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="BArch">BArch</option>
              <option value="MBBS">MBBS</option>
              <option value="LLB">LLB</option>
              <option value="BDS">BDS</option>
              <option value="BPharm">BPharm</option>
              <option value="BAMS">BAMS</option>
              <option value="BHMS">BHMS</option>
              <option value="BPT">BPT</option>
              <option value="B.Ed">B.Ed</option>
              <option value="BFA">BFA</option>
              <option value="BHM">BHM</option>
              <option value="B.Voc">B.Voc</option>
              <option value="BBA LLB">BBA LLB</option>
              <option value="B.Tech + M.Tech">B.Tech + M.Tech</option>
              <option value="Integrated B.Tech">Integrated B.Tech</option>
              <option value="BE">BE</option>
             /* Add more courses as needed
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              // onChange={handleInputChange}
              onChange={handleBranchChange}
              className="form-control"
              required
            >
              <option value="" disabled>Select Branch</option>
              {selectedBranchOptions.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subjects">Subjects:</label>
            {formData.subjects.map((subject, index) => (
              <select
                key={index}
                value={subject}
                onChange={(e) => handleSubjectChange(e, index)}
                className="form-control"
                multiple
                required

              >
                {/* <option value="">Select Subject</option> */}
                {formData.course &&
                  formData.branch &&
                  subjectOptions[formData.course] &&
                  subjectOptions[formData.course][formData.branch] &&
                  subjectOptions[formData.course][formData.branch].map((subjectOption, optionIndex) => (
                    <option key={optionIndex} value={subjectOption}>
                      {subjectOption}
                    </option>
                  ))}
              </select>
            ))}

          </div>

         
          <div className="form-group">
  <label htmlFor="year">Year:</label>
  <select
    id="year"
    name="year"
    value={formData.year}
    onChange={handleChange}
    className="form-control"
    required
  >
    <option value="" disabled>Select Current Year Of The Course</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
  </select>
</div>



        </div>
        <div className="form-group">
  <label htmlFor="mobileNumber">Mobile Number:</label>
  <input
    type="text"
    id="mobileNumber"
    name="mobileNumber"
    value={formData.mobileNumber}
    placeholder="Enter Mobile No."
    onChange={handleChange}
    maxLength={13}
    minLength={10}
    pattern="^[+6-9][0-9]*$"
    className="form-control"
    required
  />
</div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="parentsMobile">Parent's Mobile Number:</label>
  <input
    type="text"
    id="parentsMobile"
    name="parentsMobile"
    value={formData.parentsMobile}
    placeholder="Enter Parent's Mobile No."
    onChange={handleChange}
    maxLength={13}
    minLength={10}
    pattern="^[+6-9][0-9]*$"
    className="form-control"
    required
  />
</div>

        <div className="form-group">
          <label htmlFor="fatherName">Father's Name:</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            placeholder="Enter Your Father's Name"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="motherName">Mother's Name:</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            placeholder="Enter Your Mother's Name"
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
            <option value="">Select State</option>


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
            <option value="">Select City</option>
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
          <label htmlFor="documentFile">Document:</label>
          <input
            type="file"
            id="documentFile"
            onChange={handleDocumentFileChange}
            className="form-control"
            required
          />
          {documentPreview && (
            <img src={documentPreview} alt="Document Preview" style={{ "maxWidth": "200px", "maxHeight": "200px" }} />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="photoFile">Photo:</label>
          <input
            type="file"
            id="photoFile"
            onChange={handlePhotoFileChange}
            className="form-control"
            required
          />
          {photoPreview && <img src={photoPreview} alt="Preview" style={{ "maxWidth": "200px", "maxHeight": "200px" }} />}
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

export default StudentRegistration;





















































