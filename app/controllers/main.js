// $("#abc").val() ~= document.getElementById("abc").value

$(document).ready(function() {
    //Xu ly code: Them, Xoa, Sua, Tim kiem

    /* Thêm:
        - Mảng Người Dùng
        - Lấy thông tin người dùng
        - Tạo đối tượng người dùng
        - Push vào mảng
    */
    var mangNguoiDung = [];
    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();
    ajaxNguoiDung
        .done(function (result) {
            mangNguoiDung = result;
            HienThi(mangNguoiDung);    
        })
        .fail(function (err) {
            console.log(err);
        })    

    function LayThongTin() {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#maLoaiNguoiDung").val();
        
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai, maLoaiNguoiDung);
        return nguoiDung;
    }
    
    function ThemNguoiDung() {
        var nguoiDung = LayThongTin();

        // mangNguoiDung.push(nguoiDung);

        nguoiDungService.ThemNguoiDung(nguoiDung)
            .done(function (result) {
                window.location.reload();
            })
            .fail(function (err) {
                console.log(err);
            })

        // HienThi(mangNguoiDung);
    }

    //Xoa nguoi dung
    $('body').delegate(".btn_xoa", "click", function() {
        var id = $(this).data("id");
        nguoiDungService.XoaNguoiDung(id)
            .done(function (result) {
            window.location.reload();
            })
            .fail(function (err) {
                console.log(err);
            })
    })

    //Sua nguoi dung
    $('body').delegate(".btn_sua", "click", function() {
        var id = $(this).data("id");
        nguoiDungService.LayThongTinChiTiet(id)
            .done(function (result) {
                var nguoiDung = result[0];
                console.log(result);
                $("#TaiKhoan").val(nguoiDung.TaiKhoan);
                $("#MatKhau").val(nguoiDung.MatKhau);
                $("#HoTen").val(nguoiDung.HoTen);
                $("#Email").val(nguoiDung.Email);
                $("#SoDienThoai").val(nguoiDung.SoDT);
                $("#maLoaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);

                // $("#btnCapNhat").css("display", "block");
                $("#btnCapNhat").show();
                // $("#btnThemND").css("display", "none");
                $("#btnThemND").hide();
            }) 
            .fail(function (err) {
                console.log(err);
            })
    })

    function CapNhatNguoiDung() {
        var nguoiDungMoi = LayThongTin();
        nguoiDungService.CapNhatNguoiDung(nguoiDungMoi)
            .done(function (result) {
                window.location.reload();
                
            })
            .fail(function (err) {
                console.log(err);
            })
    }

    function HienThi(mangHienThi) {
        var tbodyDanhSach = $("#tblDanhSachNguoiDung");
        var content = "";
        

        for (var i = 0; i < mangHienThi.length; i++) {
            var nguoiDung = mangNguoiDung[i];
            content += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td>${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td>
                    <td>${nguoiDung.MaLoaiNguoiDung}</td>
                    <td>
                        <button data-id="${nguoiDung.TaiKhoan}" data-toggle="modal"
                        data-target="#myModal" class="btn btn-warning btn_sua">Sửa</button>
                        <button data-id="${nguoiDung.TaiKhoan}" class="btn btn-danger btn_xoa">Xóa</button>
                    </td>  
                </tr>
            `
        }
        tbodyDanhSach.html(content);
    }

    //Goi ham
    $("#btnThemND").click(ThemNguoiDung);
    $("#btnCapNhat").click(CapNhatNguoiDung);
})