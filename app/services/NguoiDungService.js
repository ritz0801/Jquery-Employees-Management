function NguoiDungService() {
    //Lay danh sach nguoi dung
    this.LayDanhSachNguoiDung = function() {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET",
        })
    }

    //Them nguoi dung
    this.ThemNguoiDung = function(nguoiDung) {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung, //body
        })
    }

    //Xoa nguoi dung
    this.XoaNguoiDung = function(id) {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE",
        })
    }

    //Lay thong tin chi tiet
    this.LayThongTinChiTiet = function(taiKhoan) {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${taiKhoan}`,
            type: "GET",
        })
    }

    //Cap nhat nguoi dung
    this.CapNhatNguoiDung = function(nguoiDungMoi) {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: nguoiDungMoi,
        })
    }
}